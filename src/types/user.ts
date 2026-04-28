export type User = {
  id: string;
  name: string;
  age: number;
  segment: string;
  points: number;
  streak: number;
};

export type FamilyMember = {
  id: string;
  name: string;
  age: number;
  relation: string;
  riskScore: number;
  reminder: string;
  recommendation: string;
};

export type Booking = {
  id: string;
  complaint: string;
  branch: string;
  service: string;
  date: string;
  time: string;
  status: string;
};
