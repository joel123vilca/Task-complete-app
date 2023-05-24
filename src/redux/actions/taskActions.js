import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import TasksController from "../controllers/tasksController";

export const types = {
  GET_TASKS: "GET_TASKS",
  SET_TASKS: "SET_TASKS",
  SET_DATA: "SET_DATA",
  UPDATE_DATA: "UPDATE_DATA",
};

export const getTasks = createAsyncThunk(
  types.GET_TASKS,
  async (_, { dispatch }) => {
    const response = await TasksController.getTasks();
    dispatch(setTasks(response));
    return response;
  }
);

export const updateTask = createAsyncThunk(
  types.UPDATE_DATA,
  async ({ payload }, { dispatch }) => {
    const response = await TasksController.updateTask(payload);
    return response;
  }
);

export const setTasks = createAction(types.SET_TASKS, (tasks) => ({
  payload: tasks,
}));

export const setData = createAction(types.SET_DATA, (item, data) => ({
  payload: {
    item,
    data,
  },
}));
