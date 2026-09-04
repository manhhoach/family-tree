import { Handle, Position } from "@xyflow/react";
import { Avatar, Card, Stack, Text } from "@mantine/core";
import { Person } from "@/src/interfaces/Person";

interface PersonNodeProps {
  data: {
    person: Person;
  };
}

export default function PersonNode({ data }: PersonNodeProps) {
  const { person } = data;

  return (
    <Card withBorder radius="md" p="sm" w={180}>
      <Handle type="target" position={Position.Top} />

      <Stack align="center" gap={5}>
        <Avatar src={person.avatar_url} size="md" radius="xl" />

        <Text size="sm" fw={600} ta="center" lineClamp={2}>
          {person.full_name}
        </Text>

        {person.birth_date && (
          <Text size="xs" c="dimmed">
            {person.birth_date.slice(0, 4)}
            {person.death_date ? ` - ${person.death_date.slice(0, 4)}` : " -"}
          </Text>
        )}
      </Stack>

      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}
