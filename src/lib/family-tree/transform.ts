import { Person } from "@/src/interfaces/Person";
import { FamilyNode } from "@/src/interfaces/FamilyTree";
import { Marriage } from "@/src/interfaces/Marriage";

export function buildFamilyNodes(
  persons: Person[],
  marriages: Marriage[],
) {
  const nodes = new Map<string, FamilyNode>();
  persons.forEach((person) => {
    nodes.set(person.id, {
      id: person.id,
      person,
      spouseIds: [],
      childIds: [],
    });
  });
  persons.forEach((person) => {
    if (person.father_id) {
      nodes.get(person.father_id)?.childIds.push(person.id);
    }

    if (person.mother_id) {
      nodes.get(person.mother_id)?.childIds.push(person.id);
    }
  });

  marriages.forEach((marriage) => {
    nodes.get(marriage.person1_id)?.spouseIds.push(marriage.person2_id);
    nodes.get(marriage.person2_id)?.spouseIds.push(marriage.person1_id);
  });

  return Array.from(nodes.values());
}
