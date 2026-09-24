"use client";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Group, SimpleGrid } from "@mantine/core";
import ViewSwitcher from "../components/ViewSwitcher";
import FamilyTree from "../components/family-tree";
import { IconPlus } from "@tabler/icons-react";
import PersonModal from "../components/PersonModal";
import { useDisclosure } from "@mantine/hooks";
import { Person } from "../interfaces/Person";
import { deletePerson, getAllPersons } from "../services/person";
import PersonCard from "../components/PersonCard";
import { Marriage } from "../interfaces/Marriage";
import { getAllMarriages } from "../services/marriage";
import { formatTreeData } from "../lib/family-tree";
import PersonDetailModal from "../components/PersonDetailModal";
import { useAuth } from "../providers/AuthProvider";

export default function Home() {
  const [view, setView] = useState<"card" | "tree">("tree");
  const [openUpsert, { open: openUpsertModal, close: closeUpsertModal }] =
    useDisclosure(false);
  const [openDetail, { open: openDetailModal, close: closeDetailModal }] =
    useDisclosure(false);
  const [currentPersonId, setCurrentPersonId] = useState<string | undefined>();
  const [persons, setPersons] = useState<Person[]>([]);
  const [marriages, setMarriages] = useState<Marriage[]>([]);
  const currentPerson = persons.find((person) => person.id === currentPersonId);

  const { isAuthenticated } = useAuth();

  const fetchData = async () => {
    const res = await getAllPersons();
    setPersons(res);
    const resMarriages = await getAllMarriages();
    setMarriages(resMarriages);
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
    openUpsertModal();
  };

  const handleDetailPerson = (id?: string) => {
    setCurrentPersonId(id);
    openDetailModal();
  };

  const treeData = useMemo(
    () => formatTreeData(persons, marriages),
    [persons, marriages],
  );

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
        {isAuthenticated && (
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
        )}
      </Group>

      <Box
        w="100%"
        style={{
          flex: 1,
          minHeight: 0,
        }}
      >
        {view === "tree" ? (
          <FamilyTree data={treeData} />
        ) : (
          <SimpleGrid cols={{ sm: 3, lg: 6, base: 2 }} spacing="md">
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
        )}
      </Box>
      {openUpsert && (
        <PersonModal
          opened={openUpsert}
          onClose={async () => {
            closeUpsertModal();
            fetchData();
          }}
          personId={currentPersonId}
        />
      )}
      {openDetail && currentPerson && (
        <PersonDetailModal
          opened={openDetail}
          onClose={async () => {
            closeDetailModal();
          }}
          person={currentPerson}
          persons={persons}
        />
      )}
    </Box>
  );
}
