import { Person } from "./Person";

export interface FamilyNode {
  id: string;
  main: boolean;
  data: Person;
  rels: {
    children: string[];
    parents: string[];
    spouses: string[];
  };
}
