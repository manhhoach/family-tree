import { Gender } from "@/src/consts/Gender";
import { Person } from "@/src/interfaces/Person";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconCalendar,
  IconEdit,
  IconGenderFemale,
  IconGenderMale,
  IconTrash,
} from "@tabler/icons-react";
import dayjs from "dayjs";

interface PersonCardProps {
  data: Person;
  handleUpsertPerson: (id?: string) => void;
  handleDelete: (id: string) => Promise<void>;
}

export default function PersonCard({
  data,
  handleUpsertPerson,
  handleDelete,
}: PersonCardProps) {
  return (
    <Card withBorder radius="md" shadow="md" w={250} pos="relative">
      <Group pos="absolute" top={0} right={4} gap={0}>
        <Tooltip label="Sửa">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => handleUpsertPerson(data.id)}
          >
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Xóa">
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDelete(data.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Stack align="center" gap="sm">
        <Avatar src={data.avatar_url} size={180} radius={90}>
          {data.full_name.charAt(0)}
        </Avatar>

        <Box ta="center">
          <Text fw={600} size="lg">
            {data.full_name}
          </Text>

          <Group px={10} py={2} mt={2} bd={"1px solid black"} bdrs="xl">
            {data.gender === Gender.MALE ? "Nam" : "Nữ"}
            {data.gender === Gender.MALE ? (
              <IconGenderMale />
            ) : (
              <IconGenderFemale />
            )}
          </Group>
        </Box>

        <Group gap="sm">
          <ThemeIcon variant="transparent" size="sm">
            <IconCalendar size={16} />
          </ThemeIcon>

          <Text size="sm">
            {data.birth_date
              ? dayjs(data.birth_date).format("DD/MM/YYYY")
              : "??"}
            {" ⇒ "}
            {data.death_date
              ? dayjs(data.death_date).format("DD/MM/YYYY")
              : "??"}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
