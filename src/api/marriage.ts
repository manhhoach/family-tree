import { supabase } from "@/src/lib/supabase/client";
import { MarriageForm } from "../interfaces/Marriage";
import { execute } from "../lib/supabase/query";

export async function createMarriage(data: MarriageForm) {
  const query = supabase.from("marriages").insert({
    person1_id: data.person1_id,
    person2_id: data.person2_id,
  });
  await execute(query);
}

export async function getMarriage(personId: string) {
  const query = supabase
    .from("marriages")
    .select("*")
    .or(`person1_id.eq.${personId},person2_id.eq.${personId}`);
  return execute(query);
}

export async function updateMarriage(data: MarriageForm) {
  const query = supabase
    .from("marriages")
    .update({
      person1_id: data.person1_id,
      person2_id: data.person2_id,
    })
    .eq("id", data.id);
  await execute(query);
}

export async function deleteMarriage(id: string) {
  const query = supabase.from("marriages").delete().eq("id", id);
  await execute(query);
}
