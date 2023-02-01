const express = require('express');
const router = express.Router();
const { todoController } = require('../controller/index');
const { todoMiddleware } = require('../middllewares');
router.route('/todo')
  .get(todoController.getAllTodo)
  .post(todoMiddleware.checkBody, todoController.addTodo);

router.route('/todo/:id')
  .get(todoMiddleware.checkParams, todoController.getTodoById)
  .put(todoMiddleware.checkParams, todoMiddleware.checkPutObject, todoController.putTodo)
  .patch(todoMiddleware.checkParams, todoMiddleware.checkPatchObject, todoController.patchTodo)
  .delete(todoMiddleware.checkParams, todoController.deleteTodo);

module.exports = router;