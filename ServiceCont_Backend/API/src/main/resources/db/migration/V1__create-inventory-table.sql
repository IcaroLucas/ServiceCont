CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    mark VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    amount INTEGER CHECK (amount >= 0),
    serial VARCHAR(100),
    record VARCHAR(100) UNIQUE,
    observation VARCHAR(250)
    CONSTRAINT chk_inventory_status CHECK (
        (status = 'consumable' AND amount IS NOT NULL AND serial IS NULL AND record IS NULL)
        OR (status = 'permanent' AND amount IS NULL AND serial IS NOT NULL AND record IS NOT NULL)
    )
);