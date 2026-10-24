-- Centralized site-wide visit counter table
CREATE TABLE IF NOT EXISTS site_counters (
    id TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 100,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial value of exactly 100 for 'visits'
INSERT INTO site_counters (id, count, created_at, updated_at)
VALUES ('visits', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT(id) DO NOTHING;
