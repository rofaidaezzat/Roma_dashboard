export type RequestStatus = "pending" | "confirmed" | "cancelled";

export interface Request {
  _id: string; // From backend
  id?: string; // Optional for mapped internal UI consistency
  name: string;
  email: string;
  phone?: string; // Making optional as backend might not return it
  message: string;
  status: RequestStatus;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
