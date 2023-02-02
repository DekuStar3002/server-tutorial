const { todoService } = require('../../src/service');
const { Todo } = require('../../database/models');

describe('Todo Service', () => {
  it('should return all todo data when getAllTodos called', async () => {
    jest.spyOn(Todo, 'findAll').mockResolvedValue([
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      },
    ]);
    const task = await todoService.getAllTodos();
    expect(task).toEqual([
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      },
    ]);
  });

  it('should return single todo data when getTodoById called', async () => {
    jest.spyOn(Todo, 'findOne').mockResolvedValue(
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }
    );
    const id = 1;
    const task = await todoService.getTodoById(id);
    expect(task).toEqual(
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }
    );
  });

  it('should return single todo data when addTodo called', async () => {
    jest.spyOn(Todo, 'create').mockResolvedValue(
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }
    );
    const name = 'todo1';
    const task = await todoService.addTodo({name});
    expect(task).toEqual(
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }
    );
  });

  it('should return integer when deleteTodo called', async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(
      1
    );
    const id = 1;
    const task = await todoService.deleteTodo(id);
    expect(task).toEqual(
      1
    );
  });

  it('should return array of integer when updateTodo called', async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue(
      [
        1
      ]
    );
    const id = 1;
    const body = {};
    const task = await todoService.updateTodo(id, body);
    expect(task).toEqual(
      [
        1
      ]
    );
  });
});