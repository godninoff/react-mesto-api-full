import { FormEvent } from "react";

export interface IUser {
  id?: number;
  email?: string;
}

export interface IUserInfo {
  userId?: number;
  name?: string;
  avatar?: string;
  about?: string;
}

export type IPopupWithForm = {
  onSubmit?: (e: FormEvent<Element>) => Promise<void>;
};
