import React, { FormEvent } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = () => {
  const avatarRef = React.useRef();

  // React.useEffect(() => {
  //   avatarRef.current.value = "";
  // }, [props.isOpen]);

  // const handleSubmit = (e: FormEvent<Element> ) => {
  //   e.preventDefault();

  //   // props.onUpdateAvatar({
  //   //   avatar: avatarRef.current.value,
  //   // });
  // };

  return <PopupWithForm onSubmit={() => Promise.resolve()} />;
};
export default EditAvatarPopup;
