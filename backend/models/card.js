import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        const pattern =
          /^(https?:\/\/)?([а-я0-9_-]{1,}|[a-z0-9_-]{1,})\.([а-я0-9_-]{1,}|[a-z0-9_-]\S{1,})/;
        return pattern.test(str);
      },
      message: "Введите URL-адрес",
    },
  },
  owner: {
    ref: "user",
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    defaut: Date.now,
  },
});

export default mongoose.model("card", cardSchema);
