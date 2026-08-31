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
    console.log(error);
    return null;
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
    console.error(error);
    return null;
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
    console.error(error);
    return false;
  }
  return true;
}
