import { Person } from "@/src/interfaces/Person";
import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";

interface PersonCardProps {
  data: Person;
  handleUpsertPerson: (id?: string) => void;
  handleDelete: (id: string) => Promise<void>;
  handleDetailPerson: (id?: string) => void;
}

export default function PersonCard({
  data,
  handleUpsertPerson,
  handleDelete,
  handleDetailPerson,
}: PersonCardProps) {
  return (
    <Card withBorder radius="md" shadow="md" w={200} pos="relative">
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
      <Stack align="center" gap="xs">
        <Avatar
          className="cursor-pointer"
          src={data.avatar_url}
          size={160}
          radius={90}
          onClick={() => {
            handleDetailPerson(data.id);
          }}
        >
          {data.full_name.charAt(0)}
        </Avatar>

        <Group ta="center">
          <Text fw={600} size="lg">
            {data.full_name}
          </Text>
        </Group>

        <Group gap="sm">
          <Text size="sm">
            {data.birth_date
              ? dayjs(data.birth_date).format("DD/MM/YYYY")
              : "??"}
            {" - "}
            {data.death_date
              ? dayjs(data.death_date).format("DD/MM/YYYY")
              : "??"}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
