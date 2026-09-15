import { FamilyNode } from "../interfaces/FamilyTree";
import { Marriage } from "../interfaces/Marriage";
import { Person } from "../interfaces/Person";

export const formatTreeData = (
  persons: Person[],
  marriages: Marriage[],
): FamilyNode[] => {
  const nodes: FamilyNode[] = persons.map((person) => ({
    id: person.id,
    main: false,
    data: person,
    rels: {
      children: [],
      parents: [],
      spouses: [],
    },
  }));

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  // Cha/mẹ - con
  persons.forEach((person) => {
    const node = nodeMap.get(person.id);
    if (!node) return;

    [person.father_id, person.mother_id].forEach((parentId) => {
      if (!parentId) return;

      if (!node.rels.parents.includes(parentId)) {
        node.rels.parents.push(parentId);
      }

      const parent = nodeMap.get(parentId);

      if (parent && !parent.rels.children.includes(person.id)) {
        parent.rels.children.push(person.id);
      }
    });
  });

  // Vợ/chồng
  marriages.forEach((marriage) => {
    const person1 = nodeMap.get(marriage.person1_id);
    const person2 = nodeMap.get(marriage.person2_id);

    if (!person1 || !person2) return;

    if (!person1.rels.spouses.includes(person2.id)) {
      person1.rels.spouses.push(person2.id);
    }

    if (!person2.rels.spouses.includes(person1.id)) {
      person2.rels.spouses.push(person1.id);
    }
  });

  // Xác định main
  nodes.forEach((node) => {
    const noParents = node.rels.parents.length === 0;

    const spousesHaveNoParents = node.rels.spouses.every((spouseId) => {
      const spouse = nodeMap.get(spouseId);
      return spouse ? spouse.rels.parents.length === 0 : false;
    });

    node.main = noParents && spousesHaveNoParents;
  });

  return nodes;
};
