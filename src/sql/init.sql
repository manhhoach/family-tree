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

ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE marriages ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_child ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view persons"
ON persons
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view marriages"
ON marriages
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view parent_child"
ON parent_child
FOR SELECT
USING (true);

CREATE POLICY "Authenticated can insert persons"
ON persons
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update persons"
ON persons
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete persons"
ON persons
FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert marriages"
ON marriages
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update marriages"
ON marriages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete marriages"
ON marriages
FOR DELETE
TO authenticated
USING (true);


CREATE POLICY "Authenticated can insert parent_child"
ON parent_child
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can delete parent_child"
ON parent_child
FOR DELETE
TO authenticated
USING (true);


CREATE POLICY "Anyone can view avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Authenticated can update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Authenticated can delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');