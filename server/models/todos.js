import mongoose from "mongoose";
const Schema = mongoose.Schema;
const todosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    status: String,
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todosSchema);
export default Todo;
