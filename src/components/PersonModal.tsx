/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import "@mantine/dates/styles.css";
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
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Gender } from "@/src/consts/Gender";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Person, PersonForm } from "@/src/interfaces/Person";
import { uploadAvatar } from "@/src/services/storage";
import {
  createPerson,
  getPersonById,
  getPersonSelection,
  updatePerson,
} from "@/src/services/person";
import { getMarriage } from "../services/marriage";

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
  const [personOptions, setPersonOptions] = useState<Person[]>([]);

  const handleSubmit = async (values: PersonForm) => {
    setLoading(true);
    try {
      const avatarUrl = avatar ? await uploadAvatar(avatar) : values.avatar_url;

      const personModel: PersonForm = {
        avatar_url: avatarUrl,
        biography: values.biography,
        birth_date: values.birth_date ? values.birth_date : undefined,
        death_date: values.death_date ? values.death_date : undefined,
        full_name: values.full_name,
        gender: values.gender,
        father_id: values.father_id,
        mother_id: values.mother_id,
        spouse_ids: values.spouse_ids,
        id: values.id,
      };
      if (values.id) {
        await updatePerson(personModel);
      } else {
        await createPerson(personModel);
      }

      form.reset();
      setAvatar(null);
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonOptions = async () => {
    const res = await getPersonSelection(personId);
    setPersonOptions(res as Person[]);
  };

  // useEffect for load form
  useEffect(() => {
    if (!opened) return;

    if (!personId) {
      form.reset();
      return;
    }

    const loadPerson = async () => {
      const person = await getPersonById(personId);
      const relationShip = await getMarriage(personId);
      if (person) {
        const originalData: PersonForm = {
          ...person,
          spouse_ids: relationShip.map((e) =>
            e.person1_id !== personId ? e.person1_id : e.person2_id,
          ),
        };
        form.setValues(originalData);
      }
    };

    loadPerson();
  }, []);

  // useEffect for init data
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPersonOptions();
  }, []);

  return (
    <Modal opened={opened} onClose={onClose} title="Thêm thành viên" size="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Paper withBorder p="xs" radius="md">
            <Title order={4}>Thông tin cá nhân</Title>

            <Group justify="space-between" grow>
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
            </Group>
            <Group justify="space-between" grow>
              <DateInput
                label="Ngày sinh"
                valueFormat="DD/MM/YYYY"
                {...form.getInputProps("birth_date")}
                clearable
              />
              <DateInput
                label="Ngày mất"
                valueFormat="DD/MM/YYYY"
                {...form.getInputProps("death_date")}
                clearable
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
                    width: 120,
                    height: 120,
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
            />
          </Paper>

          <Paper withBorder p="xs" radius="md">
            <Title order={4}>Quan hệ gia đình</Title>

            <Group gap="md" grow>
              <Select
                label="Cha"
                data={personOptions
                  .filter((x) => x.gender === Gender.MALE)
                  .map((e) => ({ value: e.id, label: e.full_name }))}
                searchable
                clearable
                {...form.getInputProps("father_id")}
              />

              <Select
                label="Mẹ"
                data={personOptions
                  .filter((x) => x.gender === Gender.FEMALE)
                  .map((e) => ({ value: e.id, label: e.full_name }))}
                searchable
                clearable
                {...form.getInputProps("mother_id")}
              />
            </Group>
            <MultiSelect
              label="Vợ / Chồng"
              data={personOptions.map((e) => ({
                value: e.id,
                label: e.full_name,
              }))}
              searchable
              {...form.getInputProps("spouse_ids")}
              clearable
            />
          </Paper>
        </Stack>

        <Button fullWidth mt="md" type="submit" loading={loading}>
          {personId ? "Cập nhật" : "Thêm mới"}
        </Button>
      </form>
    </Modal>
  );
}
