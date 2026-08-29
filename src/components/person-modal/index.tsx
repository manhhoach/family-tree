"use client";

import {
  Button,
  Modal,
  Select,
  TextInput,
  Textarea,
  FileInput,
  SimpleGrid,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { Gender } from "@/src/consts/Gender";

interface PersonModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function PersonModal({ opened, onClose }: PersonModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Thêm thành viên" size="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Thông tin cá nhân */}
        <Paper withBorder p="md" radius="md">
          <Title order={4} mb="md">
            Thông tin cá nhân
          </Title>

          <Stack gap="md">
            <TextInput label="Họ và tên" placeholder="Nguyễn Văn A" required />

            <Select
              label="Giới tính"
              placeholder="Chọn giới tính"
              data={[
                { value: Gender.MALE, label: "Nam" },
                { value: Gender.FEMALE, label: "Nữ" },
              ]}
              required
            />

            <TextInput label="Ngày sinh" type="date" />

            <Textarea label="Tiểu sử" placeholder="Nhập tiểu sử..." rows={5} />

            <FileInput
              label="Ảnh đại diện"
              placeholder="Chọn ảnh"
              accept="image/*"
            />
          </Stack>
        </Paper>

        {/* Quan hệ gia đình */}
        <Paper withBorder p="md" radius="md">
          <Title order={4} mb="md">
            Quan hệ gia đình
          </Title>

          <Stack gap="md">
            <Select
              label="Cha"
              placeholder="Chọn cha"
              data={[]}
              searchable
              clearable
            />

            <Select
              label="Mẹ"
              placeholder="Chọn mẹ"
              data={[]}
              searchable
              clearable
            />

            <Select
              label="Vợ / Chồng"
              placeholder="Chọn vợ / chồng"
              data={[]}
              searchable
              clearable
              multiple
            />
          </Stack>
        </Paper>
      </SimpleGrid>

      <Button fullWidth mt="md" onClick={onClose}>
        Thêm thành viên
      </Button>
    </Modal>
  );
}
