const { Todo } = require('../../database/models');

const getAllTodos = async (userId) => {
  return Todo.findAll({ where: { userId } });
};

const getTodoById = async (id, userId) => {
  return Todo.findOne({
    where: {
      id,
      userId
    }
  });
};

const addTodo = async (name, userId) => {
  return Todo.create({name, userId});
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