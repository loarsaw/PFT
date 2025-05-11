import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slice/task";
import userReducer from "./slice/user";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
