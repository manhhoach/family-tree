"use client";

import { Person } from "../interfaces/Person";
import { DataTable } from "mantine-datatable";
import { TextInput, Group, ActionIcon, Box, Button } from "@mantine/core";
import { IconSearch, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

interface PersonListProps {
  persons: Person[];
  handleUpsertPerson: (id?: string) => void;
  handleDelete: (id: string) => Promise<void>;
  handleDetailPerson: (id?: string) => void;
}

export default function PersonList({
  persons,
  handleUpsertPerson,
  handleDelete,
  handleDetailPerson,
}: PersonListProps) {
  const [search, setSearch] = useState("");
  const { isAuthenticated } = useAuth();

  const filteredPersons = persons.filter((person) =>
    person.full_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box
      w={1000}
      mx={"auto"}
      mt={15}
      px={15}
      pt={15}
      h={580}
      style={{
        border: "1px solid var(--mantine-color-gray-3)",
        borderRadius: "10px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Group mb="md" display={"flex"} justify="start" align="center" gap="lg">
        <TextInput
          placeholder="Tìm kiếm họ và tên..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {isAuthenticated && (
          <Button
            w={30}
            h={30}
            p={0}
            radius="50%"
            onClick={() => {
              handleUpsertPerson();
            }}
          >
            <IconPlus />
          </Button>
        )}
      </Group>

      <Box style={{ overflow: "auto", flex: 1, minHeight: 0 }}>
        <DataTable
          withTableBorder
          borderRadius="sm"
          striped
          highlightOnHover
          records={filteredPersons}
          columns={[
            {
              accessor: "full_name",
              title: "Họ và tên",
              sortable: true,
              render: (person) => (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDetailPerson(person.id)}
                >
                  {person.full_name}
                </span>
              ),
            },
            {
              accessor: "birth_date",
              title: "Ngày sinh",
              render: (person) => {
                if (!person.birth_date) return "";
                const date = new Date(person.birth_date);
                return date.toLocaleDateString("vi-VN");
              },
            },
            {
              accessor: "actions",
              title: "Thao tác",
              textAlign: "right",
              hidden: !isAuthenticated,
              render: (person) => {
                if (!isAuthenticated) return "";
                return (
                  <Group gap="xs" justify="right">
                    <ActionIcon
                      variant="subtle"
                      onClick={() => handleUpsertPerson(person.id)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>

                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => handleDelete(person.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
}
