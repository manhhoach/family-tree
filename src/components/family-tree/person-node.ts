import { Person } from "@/src/interfaces/Person";

export default function PersonNode(person: Person): string {
  const avatar = person.avatar_url || "";
  const fullName = person.full_name || "??";
  const birthDate = person.birth_date || "??";
  const deathDate = person.death_date || "??";

  return `
    <div
      class="card-inner"
      style="
        width: 240px;
        height: 90px;
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 14px;
        background: #ffffff;
        color: #000000;
        border-radius: 14px;
        border: 2px solid #2f8f82;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      "
    >
      <div
        style="
          width: 60px;
          height: 60px;
          min-width: 60px;
          border-radius: 50%;
          overflow: hidden;
          background: #ffffff;
          border: 2px solid #2f8f82;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        ${
          avatar
            ? `
              <img
                src="${avatar}"
                alt="${fullName}"
                style="
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: block;
                "
              />
            `
            : `
              <div
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #2f8f82;
                  font-size: 18px;
                  font-weight: 600;
                "
              >
                ??
              </div>
            `
        }
      </div>

      <div
        style="
          flex: 1;
          min-width: 0;
          text-align: left;
        "
      >
        <div
          style="
            color: #000000;
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          ${fullName}
        </div>

        <div
          style="
            color: #888888;
            font-size: 13px;
            font-weight:500;
            line-height: 18px;
            margin-top: 2px;
          "
        >
          ${birthDate} - ${deathDate}
        </div>
      </div>
    </div>
  `;
}
