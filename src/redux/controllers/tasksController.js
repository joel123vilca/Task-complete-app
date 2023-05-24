import axios from "axios";
const BASE_URL = "http://localhost:5000";

class TasksController {
  static async getTasks() {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      const tasks = response.data;
      return tasks;
    } catch (err) {
      throw err;
    }
  }

  static async updateTask(payload) {
    try {
      const response = await axios.put(
        `${BASE_URL}/tasks/${payload.id}`,
        payload
      );
      const tasks = response.data;
      return tasks;
    } catch (err) {
      throw err;
    }
  }
}

export default TasksController;
