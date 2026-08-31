import { Gender } from "../consts/Gender";

export interface Person {
  id: string;
  full_name: string;
  gender: Gender;
  birth_date: string | null;
  death_date: string | null;
  biography: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PersonForm {
  full_name: string;
  gender: Gender;
  birth_date: string;
  avatar_url: string;

  death_date: string | null;
  biography: string | null;
  father_id: string | null;
  mother_id: string | null;
  spouse_ids: string[] | null;
}

export interface PersonSearchCondition{
  full_name?: string;
}