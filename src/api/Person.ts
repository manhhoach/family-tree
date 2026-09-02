import {
  Person,
  PersonForm,
  PersonSearchCondition,
} from "../interfaces/Person";
import { supabase } from "@/src/lib/supabase/client";

export async function getAllPersons(
  condition?: PersonSearchCondition,
): Promise<Person[] | null> {
  let query = supabase.from("persons").select("*");
  if (condition && condition.full_name) {
    query = query.ilike("full_name", `%${condition.full_name ?? ""}%`);
  }
  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data;
}

export async function getPersonById(id: string): Promise<Person | null> {
  const { data, error } = await supabase
    .from("persons")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }

  return data;
}

export async function createPerson(person: PersonForm) {
  const { error } = await supabase.from("persons").insert({
    full_name: person.full_name,
    gender: person.gender,
    birth_date: person.birth_date,
    death_date: person.death_date,
    biography: person.biography,
    avatar_url: person.avatar_url,
  });
  if (error) {
    throw error;
  }
}

export async function updatePerson(person: PersonForm) {
  if (!person.id) {
    throw new Error("Person ID is required");
  }

  const { error } = await supabase
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

  if (error) {
    throw error;
  }
}

export async function deletePerson(id: string) {
  const { error } = await supabase.from("persons").delete().eq("id", id);
  if (error) {
    throw error;
  }
}
