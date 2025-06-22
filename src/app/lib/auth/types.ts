import { IUser as MongoUser } from "@/app/models/User";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: string;
}

export interface AuthResponse {
  user?: SessionUser;
  error?: string;
}

export interface CredentialsInput {
  email: string;
  password: string;
}

export interface RegisterInput extends CredentialsInput {
  name: string;
}

export interface OAuthInput {
  code?: string;
  token?: string;
}

export type UserDocument = MongoUser;