"use client";

import { deletePerson, getAllPersons } from "@/src/api/person";
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

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xoá thành viên này không?")) return;

    try {
      await deletePerson(id);
      await fetchData();
    } catch (error) {
      console.error(error);
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
            handleDelete={handleDelete}
          />
        ))}
    </SimpleGrid>
  );
}
