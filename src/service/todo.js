const database = require('../db');
const todoModel = require('../models/todo');

const getAllTodos = (response) => {
  try {
    response.status(200);
    return {
      status: 'success',
      message: 'data fetched successfully',
      data: database.todos.filter(todo => !todo.isCompleted),
    };
  } catch (error) {
    response.status(500);
    return {
      status: 'failure',
      message: 'unable to fetch data',
      error: error.message,
    };
  }
};

const getTodoById = (id, response) => {
  try {
    const todos = database.todos.filter(todo => todo.id === id && !todo.isCompleted);
    if(todos.length === 0){
      response.status(404);
      return {
        status: 'failure',
        message: `unable to find todo with id ${id}`,
        data: []
      };
    }
    response.status(200);
    return {
      status: 'success',
      message: `found todo with id ${id}`,
      data: todos,
    };
  } catch (error) {
    response.status(500);
    return {
      status: 'failure',
      message: 'unable to fetch data',
      error: error.message,
    };
  }
};

const addTodo = (todoData, response) => {
  try {
    response.status(201);
    database.todos = [ ...database.todos, todoModel(database.id, todoData.name, false)];
    database.id += 1;
    return {
      status: 'success',
      message: 'data added successfully',
      data: database.todos.filter( todo => !todo.isCompleted),
    };
  } catch (error) {
    response.status(500);
    return {
      status: 'failure',
      message: 'unable to add data',
      error: error.message,
    };
  }
};

const putTodo = (id, todoData, response) => {
  try {
    const index = database.todos.findIndex(todo => todo.id === id);
    if(index === -1) {
      response.status(404);
      return {
        status: 'failure',
        message: `unable to find data with id ${id}`,
        data: [],
      };
    }
    response.status(200);
    database.todos = database.todos.map((todo) => todo.id === id ? todoData : todo);
    return {
      status: 'success',
      message:`successfully updated the data with id ${id}`,
      data: database.todos,
    };
  } catch (error) {
    response.status(500);
    return {
      status: 'failure',
      message: 'unable to update data',
      error: error.message,
    };
  }
};

const patchTodo = (id, todoBody, response) => {
  try {
    const index = database.todos.findIndex( todo => todo.id === id && !todo.isCompleted);
    if(index === -1) {
      response.status(404);
      return {
        status: 'failure',
        message: `unable to find data with id ${id}`,
        data: [],
      };
    }
    response.status(200);
    database.todos = database.todos.map(todo => todo.id === id ? { ...todo, ...todoBody } : todo);
    return {
      status: 'success',
      message:`successfully updated the data with id ${id}`,
      data: database.todos,
    };
  } catch (error) {
    response.status(500);
    return {
      status: 'failure',
      message: 'unable to update data',
      error: error.message,
    };
  }
};

const deleteTodo = (id, response) => {
  try {
    const index = database.todos.findIndex( todo => todo.id === id );
    if(index === -1){
      response.status(404);
      return {
        status: 'failure',
        message: `unable to find item with id ${id}`,
        data: []
      };
    }
    database.todos = database.todos.map(todo => todo.id === id ? { ...todo, isCompleted: true } : todo );
    response.status(200);
    return {
      status: 'success',
      message: `delete item with id ${id}`,
      data: [ database.todos[index] ],
    };
  } catch (error) {
    response.status(500);
    return {
      status: 'failure',
      message: 'unable to update data',
      error: error.message,
    };
  }
};

module.exports = { getAllTodos, getTodoById, addTodo, putTodo, patchTodo, deleteTodo };