const express = require('express');
const router = express.Router();
const { todoController } = require('../controller/index');
const { todoMiddleware } = require('../middllewares');
router.route('/todo')
  .get(todoMiddleware.validateUser, todoController.getAllTodo)
  .post(todoMiddleware.validateUser, todoMiddleware.checkBody, todoController.addTodo);

router.route('/todo/:id')
  .get(todoMiddleware.validateUser, todoMiddleware.checkParams, todoController.getTodoById)
  .put(todoMiddleware.validateUser, todoMiddleware.checkParams, todoMiddleware.checkPutObject, todoController.putTodo)
  .patch(todoMiddleware.validateUser, todoMiddleware.checkParams, todoMiddleware.checkPatchObject, todoController.patchTodo)
  .delete(todoMiddleware.validateUser, todoMiddleware.checkParams, todoController.deleteTodo);

module.exports = router;