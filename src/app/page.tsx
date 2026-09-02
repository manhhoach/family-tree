"use client";
import { useEffect, useState } from "react";
import { Box, Button, Group, SimpleGrid } from "@mantine/core";
import ViewSwitcher from "../components/ViewSwitcher";
import FamilyTree from "../components/family-tree/FamilyTree";
import { IconPlus } from "@tabler/icons-react";
import PersonModal from "../components/PersonModal";
import { useDisclosure } from "@mantine/hooks";
import { Person } from "../interfaces/Person";
import { deletePerson, getAllPersons } from "../api/person";
import PersonCard from "../components/PersonCard";

export default function Home() {
  const [view, setView] = useState<"card" | "tree">("tree");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPersonId, setCurrentPersonId] = useState<string | undefined>();
  const [data, setData] = useState<Person[]>([]);

  const fetchData = async () => {
    const res = await getAllPersons();
    console.log(res)
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

  const handleUpsertPerson = (id?: string) => {
    setCurrentPersonId(id);
    open();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  return (
    <Box
      w="90%"
      mx="auto"
      pt="md"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Group mb="md" display={"flex"} justify="center" gap="lg">
        <ViewSwitcher value={view} onChange={setView} />
        <Button
          w={40}
          h={40}
          p={0}
          radius="50%"
          onClick={() => {
            handleUpsertPerson();
          }}
        >
          <IconPlus />
        </Button>
      </Group>

      <Box
        w="100%"
        style={{
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* {view === "tree" ? <FamilyTree /> : <FamilyCard />} */}
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
      </Box>
      {opened && (
        <PersonModal
          opened={opened}
          onClose={async () => {
            close();
            await fetchData();
          }}
          personId={currentPersonId}
        />
      )}
    </Box>
  );
}
