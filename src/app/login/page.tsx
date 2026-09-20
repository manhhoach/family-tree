"use client";

import { FormEvent, useState } from "react";
import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { supabase } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data)
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

   // router.push("/");
  };

  return (
    <Center h="81vh" bg="gray.0">
      <Paper withBorder shadow="md" radius="md" p="xl" w={400}>
        <form onSubmit={handleLogin}>
          <Stack gap="lg">
            <Stack gap={4} align="center">
              <Title order={2}>Đăng nhập</Title>
            </Stack>

            <TextInput
              label="Email"
              placeholder="Nhập email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />

            {error && (
              <Text size="sm" c="red">
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth loading={loading}>
              Đăng nhập
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
