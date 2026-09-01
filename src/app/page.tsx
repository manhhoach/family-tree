"use client";
import { useState } from "react";
import { Box, Button, Group } from "@mantine/core";
import ViewSwitcher from "../components/ViewSwitcher";
import FamilyTree from "../components/family-tree/FamilyTree";
import FamilyMembers from "../components/family-members";
import { IconPlus } from "@tabler/icons-react";
import PersonModal from "../components/person-modal";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [view, setView] = useState<"card" | "tree">("tree");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPersonId, setCurrentPersonId] = useState<string | undefined>();

  const handleUpsertPerson = (id?: string) => {
    setCurrentPersonId(id);
    open();
  };

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
        <FamilyMembers handleUpsertPerson={handleUpsertPerson} />
      </Box>

      <PersonModal opened={opened} onClose={close} personId={currentPersonId} />
    </Box>
  );
}
