export type ColorType = "print" | "solid";
export type NoteType = "sampleRejectionComment" | "productNote" | "fabricNote";
export type UserRole = "Factory" | "VChapman" | "Admin";
export type UserPayload = {
  id: string;
  role: UserRole;
  firstName: string;
};
export type DecodedTokenPayload<T> = {
  [K in keyof T]: T[K];
} & { iat: number; exp: number };

export type FileType = "tech-pack" | "print" | "note-image";
