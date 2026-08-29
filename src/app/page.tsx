"use client";
import { useState } from "react";
import { Box, Button, Group } from "@mantine/core";
import ViewSwitcher from "../components/ViewSwitcher";
import FamilyTree from "../components/family-tree/FamilyTree";
import FamilyCard from "../components/family-card/FamilyCard";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import PersonModal from "../components/person-modal";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [view, setView] = useState<"card" | "tree">("tree");
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPersonId, setCurrentPersonId] = useState<string | null>(null);
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
            setCurrentPersonId(null);
            open();
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
        {view === "tree" ? <FamilyTree /> : <FamilyCard />}
      </Box>

      <PersonModal opened={opened} onClose={close} />
    </Box>
  );
}
