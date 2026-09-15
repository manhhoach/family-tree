import { Person } from "@/src/interfaces/Person";

export default function PersonNode(person: Person): string {
  console.log("PersonNode:", person);

  const avatar = person.avatar_url || "";
  const fullName = person.full_name || "??";
  const birthDate = person.birth_date || "??";
  const deathDate = person.death_date || "??";

  return `
    <div
      class="card-inner"
      style="
        width: 220px;
        height: 80px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 12px;
        background: #ffffff;
        color: #000000;
        border-radius: 8px;
        border: 1px solid #ddd;
      "
    >
      <div
        style="
          width: 60px;
          height: 60px;
          min-width: 60px;
          border-radius: 50%;
          overflow: hidden;
          background: #ddd;
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
                  color: #666;
                  font-size: 18px;
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
          color: #000000;
          text-align: left;
        "
      >
        <div
          style="
            color: #000000;
            font-size: 15px;
            font-weight: 600;
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
            color: #666666;
            font-size: 13px;
            line-height: 18px;
          "
        >
          ${birthDate} - ${deathDate}
        </div>
      </div>
    </div>
  `;
}
