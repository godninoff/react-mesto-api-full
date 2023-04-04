import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = (props) => {
  return (
    <PopupWithForm
      name="popup_confirm"
      title="Вы уверены?"
      buttonSaveText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  );
};
export default ConfirmPopup;
