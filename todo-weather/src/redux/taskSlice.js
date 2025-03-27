import { createSlice } from "@reduxjs/toolkit";

//Function to load tasks from localStorage for a logged-in user
const loadTasksFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return []; //No tasks if no logged-in user

  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasksFromStorage(),
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      if (localStorage.getItem("user")) {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      if (localStorage.getItem("user")) {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action) => {
      const { id, text } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].text = text;
        if (localStorage.getItem("user")) {
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      }
    },
    hideTasksOnLogout: (state) => {
      state.tasks = []; //Hide tasks when user logs out
    },
    loadTasksOnLogin: (state) => {
      state.tasks = loadTasksFromStorage(); //Reload tasks when user logs in
    },
  },
});

export const { addTask, removeTask, updateTask, hideTasksOnLogout, loadTasksOnLogin } =
  taskSlice.actions;
export default taskSlice.reducer;