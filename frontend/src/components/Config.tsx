export const getConfig = () => [
  {
    type: "edit",
    title: "Редактировать профиль",
    inputs: [
      {
        id: "name",
        value: "Имя",
        type: "text",
      },
      {
        id: "description",
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
        id: "placename",
        value: "Название",
        type: "text",
      },
      {
        id: "link",
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
        id: "avatar",
        value: "Ссылка на новый аватар",
        type: "text",
      },
    ],
  },
];
