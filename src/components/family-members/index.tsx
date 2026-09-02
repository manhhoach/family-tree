import { Person } from "@/src/interfaces/Person";
import PersonCard from "./person-card";
import { SimpleGrid } from "@mantine/core";

interface FamilyMembersProps {
  handleUpsertPerson: (id?: string) => void;
  data: Person[];
  handleDelete: (id: string) => Promise<void>;
}

export default function FamilyMembers({
  handleUpsertPerson,
  data,
  handleDelete,
}: FamilyMembersProps) {
  return (
    <SimpleGrid cols={{ sm: 3, lg: 6, base: 2 }} spacing="md">
      {data &&
        data.map((person) => (
          <PersonCard
            handleUpsertPerson={handleUpsertPerson}
            data={person}
            key={person.id}
            handleDelete={handleDelete}
          />
        ))}
    </SimpleGrid>
  );
}
