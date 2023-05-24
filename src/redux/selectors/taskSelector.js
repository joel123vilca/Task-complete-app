import { createSelector } from "@reduxjs/toolkit";

export const taskStateSelector = createSelector(
  (state) => state.task,
  (task) => task
);

export const tasksSelector = createSelector(
  taskStateSelector,
  (state) => state.tasks
);

export const taskSelector = createSelector(
  taskStateSelector,
  (state) => state.data
);
