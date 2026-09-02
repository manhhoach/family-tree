import {
  Person,
  PersonForm,
  PersonSearchCondition,
} from "../interfaces/Person";
import { supabase } from "@/src/lib/supabase/client";
import { execute } from "../lib/supabase/query";

export async function getAllPersons(condition?: PersonSearchCondition) {
  let query = supabase.from("persons").select("*").order("full_name");
  if (condition && condition.full_name) {
    query = query.ilike("full_name", `%${condition.full_name ?? ""}%`);
  }
  return execute(query);
}

export async function getPersonById(id: string): Promise<Person | null> {
  const query = supabase.from("persons").select("*").eq("id", id).single();
  return execute(query);
}

export async function createPerson(person: PersonForm) {
  const query = supabase.from("persons").insert({
    full_name: person.full_name,
    gender: person.gender,
    birth_date: person.birth_date,
    death_date: person.death_date,
    biography: person.biography,
    avatar_url: person.avatar_url,
  });
  await execute(query);
}

export async function updatePerson(person: PersonForm) {
  if (!person.id) {
    throw new Error("Person ID is required");
  }

  const query = supabase
    .from("persons")
    .update({
      full_name: person.full_name,
      gender: person.gender,
      birth_date: person.birth_date || null,
      death_date: person.death_date || null,
      biography: person.biography || null,
      avatar_url: person.avatar_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", person.id);

  await execute(query);
}

export async function deletePerson(id: string) {
  const query = supabase.from("persons").delete().eq("id", id);
  await execute(query);
}

export async function getPersonSelection(id?: string) {
  let query = supabase.from("persons").select(
    `
    id,
    full_name,
    gender
    `,
  );
  if (id) {
    query = query.neq("id", id);
  }
  return execute(query);
}
