import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import taskReducer from "./slice/task";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
