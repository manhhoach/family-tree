/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuth } from "@/src/providers/AuthProvider";
import {
  Button,
  Group,
  Text,
  Box,
  Menu,
  UnstyledButton,
  Avatar,
} from "@mantine/core";
import Link from "next/link";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <Box
      component="header"
      style={{
        background: "#387868",
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
        {isAuthenticated ? (
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <UnstyledButton>
                <Group gap="sm">
                  <Avatar
                    src={user?.user_metadata?.avatar_url}
                    alt={""}
                    radius="xl"
                  />

                  <Text c="white" fw={600} size="sm">
                    {user?.user_metadata?.full_name ?? "Mạnh"}
                  </Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item color="red" onClick={logout}>
                Đăng xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
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
          </>
        )}
      </Group>
    </Box>
  );
}
