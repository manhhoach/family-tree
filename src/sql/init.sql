CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL
        CHECK (gender IN ('MALE', 'FEMALE')),

    birth_date DATE,
    death_date DATE,
    
    biography TEXT,
    avatar_url TEXT,
    father_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    mother_id UUID REFERENCES persons(id) ON DELETE SET NULL,

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


CREATE INDEX idx_marriages_person1
ON marriages(person1_id);

CREATE INDEX idx_marriages_person2
ON marriages(person2_id);

ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE marriages ENABLE ROW LEVEL SECURITY;

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