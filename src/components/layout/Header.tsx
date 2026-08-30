/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Group, Text, Box } from "@mantine/core";
import Link from "next/link";

export default function Header() {
  return (
    <Box
      component="header"
      style={{
        background: "#173F35",
      }}
    >
      <Group
        h={84}
        px={{ base: "lg", sm: "xl" }}
        justify="space-between"
        maw={1400}
        mx="auto"
      >
        {/* Brand */}
        <Group gap="md">
          <Box
            w={90}
            h={90}
            style={{
              display: "grid",
              placeItems: "center",
              borderRadius: 14,
            }}
          >
            <img alt="icon" src={"/family-tree.png"} />
          </Box>

          <Text
            fw={700}
            size="28px"
            c="white"
            style={{
              letterSpacing: "-0.8px",
            }}
          >
            Gia phả họ Bùi Thế
          </Text>
        </Group>

        {/* Login */}
        <Button
          component={Link}
          href="/login"
          size="md"
          radius="xl"
          variant="subtle"
          styles={{
            root: {
              color: "white",
              fontWeight: 600,
              paddingInline: 20,
              background: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Đăng nhập
        </Button>
      </Group>
    </Box>
  );
}
