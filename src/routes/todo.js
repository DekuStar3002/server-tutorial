const express = require('express');
const router = express.Router();
const { todoController } = require('../controller/index');

router.route('/todo')
  .get(todoController.getAllTodo)
  .post(todoController.addTodo);

router.route('/todo/:id')
  .get(todoController.getTodoById)
  .put(todoController.putTodo);

module.exports = router;