/**
 * Cloudflare Pages Functions - Centralized Site Visit Counter
 * Project: مدرسة أبي بكر الصديق الأساسية للبنين الثانية
 * Storage: Cloudflare D1 Database (Atomic SQL with parameterization)
 */

export async function onRequest(context) {
    const { request, env } = context;
    // Support either DB or abs2e_preview_counter binding
    const db = env.DB || env.abs2e_prod_counter || env.abs2e_preview_counter;

    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    const method = request.method.toUpperCase();

    if (method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    if (method !== 'GET' && method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed', ok: false }), {
            status: 405,
            headers
        });
    }

    if (!db) {
        return new Response(JSON.stringify({ error: 'D1 database binding not configured', ok: false }), {
            status: 503,
            headers
        });
    }

    try {
        // Ensure table exists safely
        await db.prepare(`
            CREATE TABLE IF NOT EXISTS site_counters (
                id TEXT PRIMARY KEY,
                count INTEGER NOT NULL DEFAULT 100,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // 1. GET: Read-only current total without incrementing
        if (method === 'GET') {
            const row = await db.prepare("SELECT count FROM site_counters WHERE id = ?").bind("visits").first();
            const count = row ? Number(row.count) : 100;
            return new Response(JSON.stringify({ count, ok: true }), { status: 200, headers });
        }

        // 2. POST: Qualifying page view increment
        // Anti-abuse: Ignore crawlers, spiders, and browser prefetch requests
        const ua = request.headers.get('user-agent') || '';
        const purpose = request.headers.get('purpose') || request.headers.get('sec-purpose') || '';
        const isPrefetch = purpose.toLowerCase() === 'prefetch';
        const isBot = /bot|spider|crawl|slurp|facebookexternalhit|bingbot|googlebot|yandex|duckduckbot|baiduspider/i.test(ua);

        if (isPrefetch || isBot) {
            const row = await db.prepare("SELECT count FROM site_counters WHERE id = ?").bind("visits").first();
            const count = row ? Number(row.count) : 100;
            return new Response(JSON.stringify({ count, ok: true, ignored: true }), { status: 200, headers });
        }

        // Atomic increment via parameterized SQL
        const updateResult = await db.prepare(
            "UPDATE site_counters SET count = count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING count"
        ).bind("visits").first();

        if (updateResult && typeof updateResult.count !== 'undefined') {
            return new Response(JSON.stringify({ count: Number(updateResult.count), ok: true }), { status: 200, headers });
        }

        // Fallback: If 'visits' record did not exist, insert initial 100
        const initResult = await db.prepare(`
            INSERT INTO site_counters (id, count, created_at, updated_at)
            VALUES (?, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET count = site_counters.count + 1
            RETURNING count
        `).bind("visits").first();

        const count = initResult ? Number(initResult.count) : 100;
        return new Response(JSON.stringify({ count, ok: true }), { status: 200, headers });

    } catch (err) {
        return new Response(JSON.stringify({
            error: 'Database operation failed',
            message: err.message,
            ok: false
        }), {
            status: 500,
            headers
        });
    }
}
