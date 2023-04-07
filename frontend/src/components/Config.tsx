export const Config = [
  {
    type: "edit",
    title: "Редактировать профиль",
    inputs: [
      {
        value: "Имя",
        type: "text",
      },
      {
        value: "Описание",
        type: "text",
      },
    ],
  },
  {
    type: "add",
    title: "Новое место",
    inputs: [
      {
        value: "Название",
        type: "text",
      },
      {
        value: "Ссылка",
        type: "text",
      },
    ],
  },
  {
    type: "avatar",
    title: "Редактировать аватар",
    inputs: [
      {
        value: "Ссылка на новый аватар",
        type: "text",
      },
    ],
  },
];
