import { Box, Container, Stack, Text } from "@mantine/core";

export default function Footer() {
  return (
    <Box component="footer" bg="#173F35" c="white" py="lg">
      <Container size="xl">
        <Stack align="center" gap={4}>
          <Text size="md" c="gray.1">
            Lưu giữ câu chuyện của gia đình
          </Text>

          <Text size="sm" c="gray.4">
            © {new Date().getFullYear()} Bùi Thế Mạnh
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
