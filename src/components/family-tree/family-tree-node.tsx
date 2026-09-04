import { Handle, Position } from "@xyflow/react";
import { Person } from "@/src/interfaces/Person";
import PersonNode from "./person-node";

interface FamilyTreeNodeData {
  person: Person;
}

interface FamilyTreeNodeProps {
  data: FamilyTreeNodeData;
}

export default function FamilyTreeNode({ data }: FamilyTreeNodeProps) {
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <PersonNode data={data} />

      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
