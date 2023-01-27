const { todoService } = require('../service/index');

const getAllTodo = (req, res) => {
  res.json(todoService.getAllTodos(res));
};

const getTodoById = (req, res) => {
  const id = Number(req.params.id);
  res.json(todoService.getTodoById(id, res));
};

const addTodo = (req, res) => {
  const todoData = req.body;
  res.json(todoService.addTodo(todoData, res));
};

const putTodo = (req, res) => {
  const id = Number(req.params.id);
  const todoData = req.body;
  res.json(todoService.putTodo(id, todoData, res));
};

module.exports = { getAllTodo, getTodoById, addTodo, putTodo };