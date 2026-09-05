"use client";

import { useEffect, useRef } from "react";
import * as f3 from "family-chart";

import { Person } from "@/src/interfaces/Person";
import { GenderV2 } from "@/src/consts/Gender";
import { Marriage } from "@/src/interfaces/Marriage";


interface FamilyTreeProps {
  persons: Person[];
  marriages: Marriage[];
}

export default function FamilyTree({ persons, marriages }: FamilyTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || persons.length === 0) return;

    containerRef.current.innerHTML = "";

    const data = persons.map((person) => {
      const parents = [person.father_id, person.mother_id].filter(
        Boolean,
      ) as string[];

      const children = persons
        .filter(
          (child) =>
            child.father_id === person.id || child.mother_id === person.id,
        )
        .map((child) => child.id);

      const spouses = marriages
        .filter(
          (marriage) =>
            marriage.person1_id === person.id ||
            marriage.person2_id === person.id,
        )
        .map((marriage) =>
          marriage.person1_id === person.id
            ? marriage.person2_id
            : marriage.person1_id,
        );

      return {
        id: person.id,

        data: {
          "first name": person.full_name,
          gender: person.gender === "MALE" ? "M" : ("F" as GenderV2),
          birthday: person.birth_date ?? "",
          avatar: person.avatar_url ?? "",
        },

        rels: {
          parents,
          children,
          spouses,
        },
      };
    });

    const chart = f3.createChart(containerRef.current, data);

    chart.setTransitionTime(500).setCardXSpacing(250).setCardYSpacing(150);

    const card = chart.setCardHtml();

    card.setCardDisplay([["first name"], ["birthday"]]);

    chart.updateTree({
      tree_position: "main_to_middle",
    });

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, [persons, marriages]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "700px",
        overflow: "hidden",
      }}
    />
  );
}
