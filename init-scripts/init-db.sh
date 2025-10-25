#!/bin/bash
set -e

# Create tables and indexes, then seed default data
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create admins table
    CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create contacts table
    CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Indexes to speed up queries
    CREATE INDEX IF NOT EXISTS idx_admins_name ON admins (name);
    CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status);
    CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);

    -- Upsert a default admin user (password is 'admin' hashed with bcrypt)
    INSERT INTO admins (name, password, admin)
    VALUES ('admin', '\$2a\$10\$0a0c9wNXx8A.NUW5m3bCIOh063FxQZCDPkFZkQ.Eka8LVntw7E00e', TRUE)
    ON CONFLICT (name) DO UPDATE
      SET password = EXCLUDED.password,
          admin = TRUE;
EOSQL