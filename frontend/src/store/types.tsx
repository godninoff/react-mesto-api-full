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
  name: string;
  title: string;
  buttonSaveText: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
};
