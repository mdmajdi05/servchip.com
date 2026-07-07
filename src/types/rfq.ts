export interface RFQFormData {
  chips: { chipId: string; quantity: number }[];
  requirements: string;
  urgency: "normal" | "urgent";
  name: string;
  email: string;
  company: string;
  phone: string;
}

export interface RFQResponse {
  success: boolean;
  id: string;
  message: string;
}
