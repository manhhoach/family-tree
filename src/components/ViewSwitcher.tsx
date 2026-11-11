"use client";
import { Group, SegmentedControl } from "@mantine/core";
type ViewMode = "card" | "tree";

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  return (
    <Group mb="md" display={"flex"} justify="center" gap="lg">
      <SegmentedControl
        value={value}
        onChange={(value) => onChange(value as ViewMode)}
        data={[
          { label: "Cây gia phả", value: "tree" },
          { label: "Danh sách", value: "card" },
        ]}
        radius="xl"
        size="md"
        bg="gray.1"
        color="green.9"
        styles={{
          root: {
            padding: 4,
            border: "1px solid var(--mantine-color-gray-2)",
          },

          indicator: {
            borderRadius: "999px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
          },

          label: {
            fontWeight: 600,
            paddingInline: 16,
          },
        }}
      />
    </Group>
  );
}
