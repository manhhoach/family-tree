import { Person } from "./Person";

export interface FamilyNode {
  id: string;
  person: Person;
  spouseIds: string[];
  childIds: string[];
}