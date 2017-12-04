const express = require('express');
const TasksController = require('../controllers/tasks.controller');

const tasksRouter = express.Router({ mergeParams : true });
const tasksCtrl = new TasksController();

tasksRouter.post('/', tasksCtrl.addTask.bind(tasksCtrl));

module.exports = tasksRouter;
