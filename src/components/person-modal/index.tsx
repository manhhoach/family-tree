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
import { useForm } from "@mantine/form";
import { useState } from "react";
import { PersonForm } from "@/src/interfaces/Person";
import { uploadAvatar } from "@/src/api/storage";
import { createPerson } from "@/src/api/person";

interface PersonModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function PersonModal({ opened, onClose }: PersonModalProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<PersonForm>({});

  const handleSubmit = async (values: PersonForm) => {
    setLoading(true);
    try {
      let avatarUrl: string | null = null;
      if (avatar) {
        avatarUrl = await uploadAvatar(avatar);
        if (!avatarUrl) {
          throw new Error("Upload ảnh thất bại");
        }
        if (avatarUrl) {
          const personModel: PersonForm = {
            avatar_url: avatarUrl,
            biography: values.biography,
            birth_date: values.birth_date,
            death_date: values.death_date,
            full_name: values.full_name,
            gender: values.gender,
            father_id: null,
            mother_id: null,
            spouse_ids: null,
          };
          const person = await createPerson(personModel);
          if (!person) {
            throw new Error("Tạo thành viên thất bại");
          }
          form.reset();
          setAvatar(null);
          onClose();
        }
      } else {
        throw new Error("Vui long chon avatar");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal opened={opened} onClose={onClose} title="Thêm thành viên" size="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">
              Thông tin cá nhân
            </Title>

            <Stack gap="md">
              <TextInput
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                required
                {...form.getInputProps("full_name")}
              />

              <Select
                label="Giới tính"
                placeholder="Chọn giới tính"
                data={[
                  { value: Gender.MALE, label: "Nam" },
                  { value: Gender.FEMALE, label: "Nữ" },
                ]}
                required
                {...form.getInputProps("gender")}
              />

              <TextInput
                label="Ngày sinh"
                type="date"
                required
                {...form.getInputProps("birth_date")}
              />

              <Textarea
                label="Tiểu sử"
                placeholder="Nhập tiểu sử..."
                rows={5}
                {...form.getInputProps("biography")}
              />

              <FileInput
                label="Ảnh đại diện"
                placeholder="Chọn ảnh"
                accept="image/*"
                value={avatar}
                onChange={setAvatar}
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

        <Button fullWidth mt="md" type="submit" loading={loading}>
          Thêm thành viên
        </Button>
      </form>
    </Modal>
  );
}
