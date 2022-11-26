export type ColorType = "print" | "solid";
export type NoteType = "sampleRejectionComment" | "productNote" | "fabricNote";
export type UserRole = "Factory" | "VChapman" | "Admin";
export type UserPayload = {
  id: string;
  role: UserRole;
  firstName: string;
};
