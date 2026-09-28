/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAuth } from "../providers/AuthProvider";

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
  const { isAuthenticated } = useAuth();

  return (
    <Card
      withBorder
      radius="md"
      shadow="md"
      w={{ base: "100%", xs: 180, sm: 200 }}
      pos="relative"
      p={{ base: "xs", sm: "md" }}
    >
      {isAuthenticated && (
        <Group
          pos="absolute"
          top={{ base: 2, sm: 4 }}
          right={{ base: 2, sm: 4 }}
          gap={0}
        >
          <Tooltip label="Sửa">
            <ActionIcon
              variant="subtle"
              color="blue"
              size="sm"
              onClick={() => handleUpsertPerson(data.id)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Xóa">
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => handleDelete(data.id)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}

      <Stack align="center" gap="xs">
        <Avatar
          className="cursor-pointer"
          src={data.avatar_url}
          size="clamp(120px, 12vw, 160px)"
          radius="50%"
          onClick={() => handleDetailPerson(data.id)}
        >
          {data.full_name.charAt(0)}
        </Avatar>

        <Text
          fw={600}
          size={{ base: "sm", sm: "lg" } as any}
          ta="center"
          lineClamp={2}
          className="cursor-pointer"
          onClick={() => handleDetailPerson(data.id)}
        >
          {data.full_name}
        </Text>

        <p className="whitespace-nowrap text-xs md:text-sm">
          {data.birth_date ? dayjs(data.birth_date).format("DD/MM/YYYY") : "??"}
          {" - "}
          {data.death_date ? dayjs(data.death_date).format("DD/MM/YYYY") : "??"}
        </p>
      </Stack>
    </Card>
  );
}
