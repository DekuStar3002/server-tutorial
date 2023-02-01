const { Todo } = require('../../database/models');

const getAllTodos = async () => {
  return Todo.findAll();
};

const getTodoById = async (id) => {
  return Todo.findOne({
    where: {
      id,
    }
  });
};

const addTodo = async (name) => {
  return Todo.create({name});
};

const updateTodo = async (id, body) => {
  return Todo.update(body, {
    where: {
      id
    }
  });
};

const deleteTodo = async (id) => {
  return Todo.destroy({
    where: {
      id
    }
  });
};

module.exports = { getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo };