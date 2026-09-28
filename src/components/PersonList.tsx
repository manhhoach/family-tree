import { SimpleGrid } from "@mantine/core";
import { Person } from "../interfaces/Person";
import PersonCard from "./PersonCard";
interface PersonListProps {
  persons: Person[];
  handleUpsertPerson: (id?: string | undefined) => void;
  handleDelete: (id: string) => Promise<void>;
  handleDetailPerson: (id?: string | undefined) => void;
}

export default function PersonList({
  persons,
  handleUpsertPerson,
  handleDelete,
  handleDetailPerson,
}: PersonListProps) {
  return (
    <SimpleGrid px={20} cols={{ sm: 3, lg: 8, base: 2 }} spacing="md" mb={10}>
      {persons &&
        persons.map((person) => (
          <PersonCard
            handleUpsertPerson={handleUpsertPerson}
            data={person}
            key={person.id}
            handleDelete={handleDelete}
            handleDetailPerson={handleDetailPerson}
          />
        ))}
    </SimpleGrid>
  );
}
