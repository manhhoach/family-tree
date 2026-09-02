export interface Marriage {
  id: string;
  person1_id: string;
  person2_id: string;
  created_at: string;
}

export interface MarriageForm {
  id?: string;
  person1_id?: string;
  person2_id?: string;
}
