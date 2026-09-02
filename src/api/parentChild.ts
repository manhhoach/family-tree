import { supabase } from "@/src/lib/supabase/client";
import { ParentChildForm } from "../interfaces/ParentChild";
import { execute } from "../lib/supabase/query";

export async function createParentChild(data: ParentChildForm) {
  const query = supabase.from("parent_child").insert({
    parent_id: data.parent_id,
    child_id: data.child_id,
  });
  await execute(query);
}

export async function getParentChild(parentId: string) {
  const query = supabase
    .from("parent_child")
    .select("*")
    .eq("parent_id", parentId)
    .single();
  return execute(query);
}

// export async function updateparentChild(data: ParentChildForm) {
//   const query = supabase
//     .from("parent_child")
//     .update({
//       person1_id: data.person1_id,
//       person2_id: data.person2_id,
//     })
//     .eq("id", data.id);
//   await execute(query);
// }

export async function deleteparentChild(id: string) {
  const query = supabase.from("parent_child").delete().eq("id", id);
  await execute(query);
}
