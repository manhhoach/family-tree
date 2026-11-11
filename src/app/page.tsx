"use client";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mantine/core";
import ViewSwitcher from "../components/ViewSwitcher";
import FamilyTree from "../components/family-tree";
import PersonModal from "../components/PersonModal";
import { useDisclosure } from "@mantine/hooks";
import { Person } from "../interfaces/Person";
import { deletePerson, getAllPersons } from "../services/person";
import { Marriage } from "../interfaces/Marriage";
import { getAllMarriages } from "../services/marriage";
import { formatTreeData } from "../lib/family-tree";
import PersonDetailModal from "../components/PersonDetailModal";
import PersonList from "../components/PersonList";

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
      w="100%"
      mx="auto"
      pt="md"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <ViewSwitcher value={view} onChange={setView} />
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
          <PersonList
            handleDelete={handleDelete}
            handleDetailPerson={handleDetailPerson}
            handleUpsertPerson={handleUpsertPerson}
            persons={persons}
          />
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
