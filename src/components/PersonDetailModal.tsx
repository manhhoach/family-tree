"use client";

import {
  Avatar,
  Badge,
  Divider,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Gender } from "@/src/consts/Gender";
import { Person } from "@/src/interfaces/Person";
import { getMarriage } from "../services/marriage";
import { getPersonById } from "@/src/services/person";

interface PersonDetailModalProps {
  opened: boolean;
  onClose: () => void;
  person: Person;
  persons: Person[];
}

export default function PersonDetailModal({
  opened,
  onClose,
  person,
  persons,
}: PersonDetailModalProps) {
  const [father, setFather] = useState<Person>();
  const [mother, setMother] = useState<Person>();
  const [spouses, setSpouses] = useState<Person[]>([]);

  useEffect(() => {
    if (!opened) return;

    const loadRelations = async () => {
      const [fatherPerson, motherPerson, marriages] = await Promise.all([
        person.father_id
          ? getPersonById(person.father_id)
          : Promise.resolve(null),

        person.mother_id
          ? getPersonById(person.mother_id)
          : Promise.resolve(null),

        getMarriage(person.id),
      ]);

      setFather(fatherPerson ?? undefined);
      setMother(motherPerson ?? undefined);

      const spouseIds = marriages.map((marriage) =>
        marriage.person1_id === person.id
          ? marriage.person2_id
          : marriage.person1_id,
      );

      setSpouses(
        spouseIds
          .map((id) => persons.find((p) => p.id === id))
          .filter((p): p is Person => Boolean(p)),
      );
    };

    loadRelations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, person.id, persons]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Thông tin thành viên"
      size="xl"
    >
      <Stack>
        <Paper withBorder p="md" radius="md">
          <Group align="flex-start">
            <Avatar src={person.avatar_url} size={120} radius="md">
              {person.full_name?.charAt(0)}
            </Avatar>

            <Stack gap={5}>
              <Title order={3}>{person.full_name}</Title>

              <Badge
                color={person.gender === Gender.MALE ? "blue" : "pink"}
                variant="light"
                w="fit-content"
              >
                {person.gender === Gender.MALE ? "Nam" : "Nữ"}
              </Badge>

              <Text size="sm" c="dimmed">
                {person.birth_date || "??"} - {person.death_date || "??"}
              </Text>
            </Stack>
          </Group>

          {person.biography && (
            <>
              <Divider my="md" />

              <Text fw={600} mb={5}>
                Tiểu sử
              </Text>

              <Text size="sm" style={{ whiteSpace: "pre-line" }}>
                {person.biography}
              </Text>
            </>
          )}
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Title order={4} mb="md">
            Quan hệ gia đình
          </Title>

          <Stack>
            <Relation label="Cha" person={father} />

            <Relation label="Mẹ" person={mother} />

            <Stack gap={5}>
              <Text size="sm" fw={500}>
                Vợ / Chồng
              </Text>

              {spouses.length > 0 ? (
                spouses.map((spouse) => (
                  <PersonRelation key={spouse.id} person={spouse} />
                ))
              ) : (
                <Text size="sm" c="dimmed">
                  Chưa có thông tin
                </Text>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
}

function Relation({ label, person }: { label: string; person?: Person }) {
  return (
    <Stack gap={5}>
      <Text size="sm" fw={500}>
        {label}
      </Text>

      {person ? (
        <PersonRelation person={person} />
      ) : (
        <Text size="sm" c="dimmed">
          Chưa có thông tin
        </Text>
      )}
    </Stack>
  );
}

function PersonRelation({ person }: { person: Person }) {
  return (
    <Group gap="sm">
      <Avatar src={person.avatar_url} size="sm" radius="xl">
        {person.full_name?.charAt(0)}
      </Avatar>

      <Text size="sm">{person.full_name}</Text>
    </Group>
  );
}
