import { model, Schema, models } from "mongoose";

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
});

export default models.Todo || model("Todo", TodoSchema);
