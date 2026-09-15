import { Person } from "@/src/interfaces/Person";

interface PersonNodeProps {
  person: Person;
}
export default function PersonNode({ person }: PersonNodeProps) {
  return <div>{person.full_name}</div>;
}
