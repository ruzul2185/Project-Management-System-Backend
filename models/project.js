import { Schema, model } from "mongoose";

// Sub-schema for members
const memberSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Member", "Viewer"],
      default: "Member",
      required: true,
    },
  },
  { _id: false }
); // _id is not needed for this sub-document

// Sub-schema for columns
const columnSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
  },
}); // Mongoose will automatically add an _id to each column

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [memberSchema],
    // members: [{userId:"2y214628462194628", role:"Member"},{},{}]
    columns: [columnSchema],
    // columns: [{_id:"7364326423", name:"TO-DO", order:0}, ]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Project", projectSchema);
