import React, { FormEvent } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEditUserMutation } from "../store/api/actionsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAllPopups } from "../store/popupReducer";

const EditProfilePopup = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useAppDispatch();
  const [editUser] = useEditUserMutation();
  const userId = useAppSelector((state) => state.auth.userId);

  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, props.isOpen]);

  const handleEditUser = async (e: FormEvent<Element>) => {
    e.preventDefault();
    if (userId)
      await editUser({
        name: name,
        about: description,
      });
    setName("");
    setDescription("");
  };

  return <PopupWithForm onSubmit={handleEditUser} />;
};
export default EditProfilePopup;
