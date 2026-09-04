import { Edge, Node } from "@xyflow/react";
import { FamilyNode } from "@/src/interfaces/FamilyTree";

export function buildFlowData(familyNodes: FamilyNode[]) {
  const nodes: Node[] = familyNodes.map((item) => ({
    id: item.id,
    type: "person",
    position: { x: 0, y: 0 },
    data: {
      person: item.person,
    },
  }));
  const edges: Edge[] = [];
  familyNodes.forEach((item) => {
    item.childIds.forEach((childId) => {
      edges.push({
        id: `${item.id}-${childId}`,
        source: item.id,
        target: childId,
        type: "smoothstep",
      });
    });

    item.spouseIds.forEach((spouseId) => {
      // Chỉ tạo 1 edge cho marriage
      if (item.id < spouseId) {
        edges.push({
          id: `marriage-${item.id}-${spouseId}`,
          source: item.id,
          target: spouseId,
          type: "straight",
        });
      }
    });
  });

  return { nodes, edges };
}
