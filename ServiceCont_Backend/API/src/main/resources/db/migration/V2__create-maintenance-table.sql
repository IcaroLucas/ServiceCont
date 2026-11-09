
CREATE TABLE maintenance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type_equipment VARCHAR(100) NOT NULL,
    mark VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    serial VARCHAR(100) NOT NULL,
    record VARCHAR(100)UNIQUE NOT NULL,
    date TIMESTAMP NOT NULL,
    school VARCHAR(100) NOT NULL,
    name_technical VARCHAR(100) NOT NULL,
    observation VARCHAR(250)
);