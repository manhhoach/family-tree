"use client";

import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Person } from "@/src/interfaces/Person";
import { buildFamilyNodes } from "@/src/lib/family-tree/transform";
import { buildFlowData } from "@/src/lib/family-tree/to-flow";
import { layoutFamilyTree } from "@/src/lib/family-tree/layout";
import { nodeTypes } from "./node-types";
import { Marriage } from "@/src/interfaces/Marriage";

interface FamilyTreeProps {
  persons: Person[];
  marriages: Marriage[];
}

export default function FamilyTree({ persons, marriages }: FamilyTreeProps) {
  const familyNodes = buildFamilyNodes(persons, marriages);

  const { nodes: flowNodes, edges } = buildFlowData(familyNodes);

  const nodes = layoutFamilyTree(flowNodes, edges);

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
