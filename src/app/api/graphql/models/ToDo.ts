import mercury from "@mercury-js/core";
export const ToDo = mercury.createModel("ToDo", {
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  description: {
    type: "string",
    trim: true,
  },
  completed: {
    type: "boolean",
    default: false,
  },
  createdAt: {
    type: "date",
    default: Date.now,
  },
  dueDate: {
    type: "date",
  },
  
});