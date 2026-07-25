export type Role = "user" | "admin";

export type Viewer = {
  userId: string | null;
  role: Role;
};

export type ChatMessage = {
  id: string;
  userId: string;
  message: string;
  isAdmin: boolean;
  createdAt: Date;
};

export type Conversation = {
  userId: string;
  chats: ChatMessage[];
};

export type ChatStore = {
  insert(input: {
    userId: string;
    message: string;
    isAdmin: boolean;
  }): Promise<ChatMessage>;
  listByUser(userId: string): Promise<ChatMessage[]>;
  listAllGrouped(): Promise<Conversation[]>;
  countRecent(userId: string, since: Date): Promise<number>;
};

export type ChatInboxError =
  | "unauthenticated"
  | "unauthorized"
  | "rate_limited"
  | "invalid";

export type ListView =
  | { kind: "own"; chats: ChatMessage[] }
  | { kind: "grouped"; conversations: Conversation[] };

export type ListResult =
  | { ok: true; view: ListView }
  | { ok: false; reason: ChatInboxError };

export type SendResult =
  | { ok: true; chat: ChatMessage }
  | { ok: false; reason: ChatInboxError };
