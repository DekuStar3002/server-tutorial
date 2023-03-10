const { todoService } = require('../service/index');

const getAllTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await todoService.getAllTodos(userId);
    res.status(200).json({
      data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params; 
    const todo = await todoService.getTodoById(id);
    res.status(200).json({
      data: todo ? todo : {},
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const addTodo = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const todo = await todoService.addTodo(name, userId);
    res.status(201).json({
      data: [ todo ],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const putTodo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { body } = req;
    const todo = await todoService.updateTodo(id, body);
    res.status(200).json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const patchTodo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { body } = req;
    const todo = await todoService.updateTodo(id, body);
    res.status(200).json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const todo = await todoService.deleteTodo(id);
    res.status(200).json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getAllTodo, getTodoById, addTodo, putTodo, patchTodo, deleteTodo };