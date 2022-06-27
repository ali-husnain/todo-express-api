const responder = require('../utils/responder');
const taskService = require('../services/task.service');

exports.createTask = async (req, res) => {
  const createdTask = await taskService.create(req);
  responder.sendResponse(res, 200, "success", createdTask, "Task created successfully.");
};

exports.findAll = async (req, res) => {
  const offset = req.body.offset ? req.body.offset : 0;
  const limit = req.body.limit ? req.body.limit : 10;
  const allTasks = await taskService.paginateByUser(req.userId, offset, limit);
  responder.sendResponse(res, 200, "success", allTasks, "All tasks list.");
};

exports.overAllProgress = async (req, res) => {
  const allTasks = await taskService.findAllByUser(req.userId);
   const inprogress = allTasks.filter((task) => task.is_completed==0);
  const completed = allTasks.filter((task) => task.is_completed==1);
  const progress = (completed.length / allTasks.length) * 100;
  const data = {
    percentage: Math.round(progress),
    inprogress: inprogress,
    completed: completed
  }
  responder.sendResponse(res, 200, "success", data, "Overall progress by user");
};

exports.taskProgressByRange = async (req, res) => {
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const allTasks = await taskService.findAllByUserAndRange(req.userId, start_date, end_date);
  const inprogress = allTasks.filter((task) => task.is_completed==0);
  const completed = allTasks.filter((task) => task.is_completed==1);
  const progress = (completed.length / allTasks.length) * 100;
  const data = {
    percentage: Math.round(progress),
    inprogress: inprogress,
    completed: completed
  }
  responder.sendResponse(res, 200, "success", data, "Progress of user within a range.");
};

exports.viewTask = async (req, res) => {
  const task = await taskService.findById(req.params.id);
  if (!task) {
    responder.sendResponse(res, 404, "error", null, "Task not found.");
  }
  responder.sendResponse(res, 200, "success", task, "View task");
}

exports.markComplete = async (req, res) => {
  const task = await taskService.findById(req.body.id);
  if (!task) {
    responder.sendResponse(res, 404, "error", null, "Task not found.");
  }
  await taskService.markCompleted(req.body.id, req.userId);
  responder.sendResponse(res, 200, "success", true, "Task completed.");
};

exports.update = async (req, res) => {
  const task = await taskService.findById(req.body.id);
  if (!task) {
    responder.sendResponse(res, 404, "error", null, "Task not found.");
  }
  await taskService.update(req.body.id, req.body.name, req.userId);
  responder.sendResponse(res, 200, "success", true, "Task updated.");
};

exports.delete = async (req, res) => {
    const task = await taskService.findById(req.params.id);
    if (!task) {
        responder.sendResponse(res, 404, "error", null, "Task not found.");
    }
    await taskService.deleteById(req.params.id, req.userId);
    responder.sendResponse(res, 200, "success", true, "Task deleted successfully.");
};
