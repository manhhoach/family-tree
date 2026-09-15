/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import * as f3 from "family-chart"; // npm install family-chart@0.9.0 or yarn add family-chart@0.9.0
import "family-chart/styles/family-chart.css";
import { FamilyNode } from "@/src/interfaces/FamilyTree";
import PersonNode from "./person-node";
import { createRoot } from "react-dom/client";

interface FamilyTreeProps {
  data: FamilyNode[];
}

export default function FamilyTree({ data }: FamilyTreeProps) {
  const ref = useRef(null);
  useEffect(() => {
    initTree(data as any);

    function initTree(data: f3.Data) {
      const f3Chart = f3
        .createChart("#FamilyChart", data)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150);

      f3Chart.setCardHtml().setCardDisplay((node: any) => {
        const container = document.createElement("div");

        createRoot(container).render(<PersonNode person={node.data} />);

        return container;
      });

      f3Chart.updateTree({ initial: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="f3"
      id="FamilyChart"
      ref={ref}
      style={{
        width: "100%",
        height: "700px",
        margin: "auto",
      }}
    ></div>
  );
}
