"use client";

import { getAllPersons } from "@/src/api/person";
import { Person } from "@/src/interfaces/Person";
import { useEffect, useState } from "react";
import PersonCard from "./person-card";
import { SimpleGrid } from "@mantine/core";

interface FamilyMembersProps {
  handleUpsertPerson: (id?: string) => void;
}

export default function FamilyMembers({
  handleUpsertPerson,
}: FamilyMembersProps) {
  const [data, setData] = useState<Person[]>([]);

  const fetchData = async () => {
    const res = await getAllPersons();
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);
  return (
    <SimpleGrid cols={{ sm: 3, lg: 6, base: 2 }} spacing="md">
      {data &&
        data.map((person) => (
          <PersonCard
            handleUpsertPerson={handleUpsertPerson}
            data={person}
            key={person.id}
          />
        ))}
    </SimpleGrid>
  );
}
