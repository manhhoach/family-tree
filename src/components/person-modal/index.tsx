/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Button,
  Modal,
  Select,
  TextInput,
  Textarea,
  FileInput,
  Paper,
  Title,
  Stack,
  Group,
} from "@mantine/core";
import { Gender } from "@/src/consts/Gender";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { PersonForm } from "@/src/interfaces/Person";
import { uploadAvatar } from "@/src/api/storage";
import { createPerson, getPersonById } from "@/src/api/person";

interface PersonModalProps {
  opened: boolean;
  onClose: () => void;
  personId?: string;
}

export default function PersonModal({
  opened,
  onClose,
  personId,
}: PersonModalProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<PersonForm>();

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
          };
          await createPerson(personModel);
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

  useEffect(() => {
    if (!opened) return;

    if (!personId) {
      console.log("aaa");
      form.reset();
      return;
    }

    const loadPerson = async () => {
      const person = await getPersonById(personId);

      if (person) {
        const originalData: PersonForm = {
          ...person,
        };
        form.setValues(originalData);
      }
    };

    loadPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, personId]);

  return (
    <Modal opened={opened} onClose={onClose} title="Thêm thành viên" size="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Paper withBorder p="xs" radius="md">
            <Title order={4}>Thông tin cá nhân</Title>

            <Group justify="space-between">
              <TextInput
                label="Họ và tên"
                required
                {...form.getInputProps("full_name")}
              />

              <Select
                label="Giới tính"
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
            </Group>
            <Stack>
              <FileInput
                label="Ảnh đại diện"
                placeholder="Chọn ảnh"
                accept="image/*"
                value={avatar}
                onChange={setAvatar}
              />
              {(avatar || form.values.avatar_url) && (
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : form.values.avatar_url
                  }
                  alt="avatar"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
            </Stack>
            <Textarea
              label="Tiểu sử"
              rows={4}
              {...form.getInputProps("biography")}
              defaultValue={""}
            />
          </Paper>

          <Paper withBorder p="xs" radius="md">
            <Title order={4}>Quan hệ gia đình</Title>

            <Stack gap="md">
              <Select label="Cha" data={[]} searchable clearable />

              <Select label="Mẹ" data={[]} searchable clearable />

              <Select
                label="Vợ / Chồng"
                data={[]}
                searchable
                clearable
                multiple
              />
            </Stack>
          </Paper>
        </Stack>

        <Button fullWidth mt="md" type="submit" loading={loading}>
          Thêm thành viên
        </Button>
      </form>
    </Modal>
  );
}
