import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    taskKey: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true, // Index for performance
    },
    columnId: {
      type: Schema.Types.ObjectId, // Refers to an _id within a Project's 'columns' array
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Highest"],
      default: "Medium",
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, // A task can be unassigned
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // dueDate: {
    //   type: Date,
    //   required: false,
    // },
    // tags: {
    //   type: [String],
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Task", taskSchema);
