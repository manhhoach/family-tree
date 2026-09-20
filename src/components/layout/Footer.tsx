import { Box, Container, Stack, Text } from "@mantine/core";

export default function Footer() {
  return (
    <Box component="footer" bg="#4e8779" c="white" py="lg">
      <Container size="xl">
        <Stack align="center" gap={4}>
          <Text size="md">Lưu giữ câu chuyện của gia đình</Text>

          <Text size="sm">© {new Date().getFullYear()} Bùi Thế Mạnh</Text>
        </Stack>
      </Container>
    </Box>
  );
}
