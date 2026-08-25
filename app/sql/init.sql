CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL
        CHECK (gender IN ('MALE', 'FEMALE')),

    birth_date DATE,
    death_date DATE,
    
    biography TEXT,
    avatar_url TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE marriages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    person1_id UUID NOT NULL
        REFERENCES persons(id) ON DELETE CASCADE,

    person2_id UUID NOT NULL
        REFERENCES persons(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT marriage_different_people
        CHECK (person1_id <> person2_id),

    CONSTRAINT unique_marriage
        UNIQUE (person1_id, person2_id)
);

CREATE TABLE parent_child (
    parent_id UUID NOT NULL
        REFERENCES persons(id) ON DELETE CASCADE,

    child_id UUID NOT NULL
        REFERENCES persons(id) ON DELETE CASCADE,

    PRIMARY KEY (parent_id, child_id),

    CONSTRAINT parent_different_child
        CHECK (parent_id <> child_id)
);

CREATE INDEX idx_parent_child_parent
ON parent_child(parent_id);

CREATE INDEX idx_parent_child_child
ON parent_child(child_id);

CREATE INDEX idx_marriages_person1
ON marriages(person1_id);

CREATE INDEX idx_marriages_person2
ON marriages(person2_id);