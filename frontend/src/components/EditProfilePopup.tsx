import React, { FormEvent } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEditUserMutation } from "../store/api/actionsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAllPopups } from "../store/popupReducer";
import { IUserInfo } from "../store/types";

const EditProfilePopup = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useAppDispatch();
  const [editUser] = useEditUserMutation();
  const userId = useAppSelector((state) => state.auth.userId);
  const [editUserById, setUsertById] = React.useState<IUserInfo>({
    name: "",
    about: "",
    avatar: "",
    userId: 0,
  });

  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, props.isOpen]);

  const handleEditUser = async (e: FormEvent<Element>) => {
    e.preventDefault();
    if (userId)
      await editUser({
        name: editUserById.name,
        about: editUserById.about,
        userId,
      });
    setUsertById({ name: name, about: description });
    setName("");
    setDescription("");
  };
  console.log(editUserById);
  return <PopupWithForm onSubmit={handleEditUser} />;
};
export default EditProfilePopup;
