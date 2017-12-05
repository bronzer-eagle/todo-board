const express = require('express');
const TasksController = require('../controllers/tasks.controller');

const tasksRouter = express.Router({ mergeParams : true });
const tasksCtrl = new TasksController();

tasksRouter.post('/', tasksCtrl.addTask.bind(tasksCtrl));
tasksRouter.put('/:id', tasksCtrl.changeStatus.bind(tasksCtrl));

module.exports = tasksRouter;
