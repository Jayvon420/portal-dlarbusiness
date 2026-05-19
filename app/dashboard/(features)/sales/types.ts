export type Sale = {
  id: string;
  date: Date;
  particular: string;
  receipt: string | null;
  amount: number;
  createdAt: Date;
};
