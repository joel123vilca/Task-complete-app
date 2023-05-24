import { createReducer } from "@reduxjs/toolkit";
import * as taskActions from "../actions/taskActions";

const initialState = {
  tasks: [],
  data: {},
};

const TaskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(taskActions.setTasks, (state, { payload }) => ({
      ...state,
      tasks: payload,
    }))
    .addCase(taskActions.setData, (state, { payload }) => ({
      ...state,
      data: payload,
    }));
});

export default TaskReducer;
