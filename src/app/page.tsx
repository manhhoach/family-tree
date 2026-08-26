"use client";
import { useState } from "react";
import { Box, Center } from "@mantine/core";

import ViewSwitcher from "../components/ViewSwitcher";
import FamilyTree from "../components/family-tree/FamilyTree";
import FamilyCard from "../components/family-card/FamilyCard";

export default function Home() {
  const [view, setView] = useState<"card" | "tree">("tree");
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
      <Center mb="md">
        <ViewSwitcher value={view} onChange={setView} />
      </Center>

      <Box
        w="100%"
        style={{
          flex: 1,
          minHeight: 0,
        }}
      >
        {view === "tree" ? <FamilyTree /> : <FamilyCard />}
      </Box>
    </Box>
  );
}
