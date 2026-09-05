export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export type GenderV2 = "M" | "F";

export type Gender = (typeof Gender)[keyof typeof Gender];
