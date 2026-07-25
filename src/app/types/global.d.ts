export {};

// The only role the app grants explicitly is "admin" (the site owner).
// Any viewer without this claim is treated as a normal "user" by the chat
// domain (see src/server/chat/types.ts `Role`).
export type Roles = "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
