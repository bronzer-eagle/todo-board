const express = require('express');
const BoardsController = require('../controllers/boards.controller');

const boardsRouter = express.Router();
const boardsCtrl = new BoardsController();

boardsRouter.post('/', boardsCtrl.create.bind(boardsCtrl));
boardsRouter.delete('/:id', boardsCtrl.remove.bind(boardsCtrl));

module.exports = boardsRouter;
