const express = require('express');
const router = express.Router();
const { todoController } = require('../controller/index');
const { todoMiddleware } = require('../middllewares');
router.route('/todo')
  .get(todoController.getAllTodo)
  .post(todoMiddleware.checkBody, todoController.addTodo);

router.route('/todo/:id')
  .get(todoController.getTodoById)
  .put(todoController.putTodo)
  .patch(todoController.patchTodo)
  .delete(todoController.deleteTodo);

module.exports = router;