"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase/client";
import { Button, Center, Container } from "@mantine/core";

import ViewSwitcher from "../components/ViewSwitcher";

export default function Home() {
  const [view, setView] = useState<"card" | "tree">("tree");
  return (
    <>
      <Container size="xl" py="md">
        <Center mb="md">
          <ViewSwitcher value={view} onChange={setView} />
        </Center>

        {view === "tree" ? <div>Tree view</div> : <div>Card view</div>}
      </Container>
    </>
  );
}
