export type ColorType = "print" | "solid";
export type NoteType =
  | "sampleRejectionComment"
  | "productNote"
  | "fabricNote"
  | "purchaseOrderNote"
  | "styleNote";
export type UserRole = "Factory" | "VChapman" | "Admin";
export const userRoles = ["Factory", "VChapman", "Admin"];
export type UserPayload = {
  id: string;
  role: UserRole;
  firstName: string;
  companyId: string;
};
export type DecodedTokenPayload<T> = {
  [K in keyof T]: T[K];
} & { iat: number; exp: number };

export type FileType = "tech-pack" | "print" | "note-image";

export type ProductSizes =
  | "00"
  | "0"
  | "2"
  | "4"
  | "6"
  | "8"
  | "10"
  | "12"
  | "14"
  | "16";

export type PurchaseOrderStatus =
  | "draft"
  | "processing"
  | "shipped"
  | "received"
  | "completed"
  | "cancelled";

export const purchaseOrderStatusSet = [
  "draft",
  "processing",
  "shipped",
  "received",
  "completed",
  "cancelled",
];
