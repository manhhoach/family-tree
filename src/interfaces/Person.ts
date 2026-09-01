import { Gender } from "../consts/Gender";

export interface Person {
  id: string;
  full_name: string;
  gender: Gender;
  birth_date?: string;
  death_date?: string;
  biography?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PersonForm {
  id?: string;
  full_name: string;
  gender: Gender;
  birth_date?: string;
  avatar_url?: string;
  death_date?: string;
  biography?: string;
  father_id?: string;
  mother_id?: string;
  spouse_ids?: string[];
}

export interface PersonSearchCondition {
  full_name?: string;
}
