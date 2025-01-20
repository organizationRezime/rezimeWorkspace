import router from "./employee.router.js";

import { assignTask, updateTask, deleteTask, archiveTask, getTask, tasksAssignedByEmployee, tasksAssignedToEmployee, archivedTasks, markAsReadTask } from "../controllers/tasks.controllers.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";

router.get("/get/:task_id", isLoggedIn, getTask);

router.get("/tasksAssignedByEmployee/:requestedEmployee_id", isLoggedIn, tasksAssignedByEmployee);
router.get("/tasksAssignedToEmployee/:requestedEmployee_id", isLoggedIn, tasksAssignedToEmployee);

router.get("/archivedTasks", isLoggedIn, archivedTasks);
router.post("/assign", isLoggedIn, assignTask);
router.post("/update", isLoggedIn, updateTask);
router.post("/delete", isLoggedIn, deleteTask);
router.post("/archive", isLoggedIn, archiveTask);
router.post("/markasread", isLoggedIn, markAsReadTask);

export default router;