/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import * as f3 from "family-chart"; // npm install family-chart@0.9.0 or yarn add family-chart@0.9.0
import "family-chart/styles/family-chart.css";
import { FamilyNode } from "@/src/interfaces/FamilyTree";
import PersonNode from "./person-node";

interface FamilyTreeProps {
  data: FamilyNode[];
}

export default function FamilyTree({ data }: FamilyTreeProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !data.length) return;

    // Đưa node gốc lên đầu
    const sortedData = [...data].sort((a, b) => {
      if (a.main !== b.main) {
        return Number(b.main) - Number(a.main);
      }

      // Ưu tiên người chồng trong cặp gốc
      if (a.main && b.main) {
        return a.data.gender === "MALE" ? -1 : 1;
      }

      return 0;
    });

    // Chuẩn hóa dữ liệu cho family-chart
    const chartData = sortedData.map((node) => ({
      id: node.id,
      data: {
        ...node.data,
        gender: node.data.gender === "MALE" ? "M" : "F",
      },
      rels: {
        parents: [...node.rels.parents],
        children: [...node.rels.children],
        spouses: [...node.rels.spouses],
      },
    }));

    // Xóa chart cũ
    ref.current.innerHTML = "";

    const chart = f3
      .createChart(ref.current, chartData as any)
      .setTransitionTime(1000)
      .setCardXSpacing(250)
      .setSingleParentEmptyCard(false)
      .setCardYSpacing(150);

    chart.setCardHtml().setCardInnerHtmlCreator((d) => {
      return PersonNode(d.data.data as any);
    });

    chart.updateTree({ initial: true });

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [data]);

  return (
    <div
      className="f3"
      ref={ref}
      style={{
        width: "100%",
        height: "600px",
        margin: "auto",
      }}
    ></div>
  );
}
