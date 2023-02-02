const { todoController } = require('../../src/controller/index');
const { todoService } = require('../../src/service');
describe('Todo Controller', () => { 
  it('should return all list of todo when called getAllTodo', async () => {
    jest.spyOn(todoService, 'getAllTodos').mockResolvedValue([
      {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }
    ]);
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.getAllTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: [
        {
          id: 1,
          name: 'todo1',
          isCompleted: false,
          createdAt: 'date-time',
          updatedAt: 'date-time'
        }
      ]
    });
  }); 

  it('should return error when called getAllTodo', async () => {
    jest.spyOn(todoService, 'getAllTodos').mockRejectedValue(new Error('Internal Server Error'));
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.getAllTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  }); 

  it('should return one todo element when called getTodoById', async () => {
    jest.spyOn(todoService, 'getTodoById').mockResolvedValue({
      id: 1,
      name: 'todo1',
      isCompleted: false,
      createdAt: 'date-time',
      updatedAt: 'date-time'
    });
    const mockReq = {
      params: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.getTodoById(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: {
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }
    });
  }); 

  it('should return error when called getTodoById', async () => {
    jest.spyOn(todoService, 'getTodoById').mockRejectedValue(new Error('Internal Server Error'));

    const mockReq = {
      params: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.getTodoById(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  }); 

  it('should return array of object when called addTodo', async () => {
    jest.spyOn(todoService, 'addTodo').mockResolvedValue({
      id: 1,
      name: 'todo1',
      isCompleted: false,
      createdAt: 'date-time',
      updatedAt: 'date-time'
    });
    const mockReq = {
      body: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.addTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith({
      data: [{
        id: 1,
        name: 'todo1',
        isCompleted: false,
        createdAt: 'date-time',
        updatedAt: 'date-time'
      }]
    });
  });

  it('should return error when called addTodo', async () => {
    jest.spyOn(todoService, 'addTodo').mockRejectedValue(new Error('Internal Server Error'));

    const mockReq = {
      body: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.addTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  }); 

  it('should return integer when called putTodo', async () => {
    jest.spyOn(todoService, 'updateTodo').mockResolvedValue([ 1 ]);
    const mockReq = {
      params: jest.fn(),
      body: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.putTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: [ 1 ]
    });
  });

  it('should return error when called putTodo', async () => {
    jest.spyOn(todoService, 'updateTodo').mockRejectedValue(new Error('Internal Server Error'));

    const mockReq = {
      params: jest.fn(),
      body: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.putTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  });

  it('should return integer when called patchTodo', async () => {
    jest.spyOn(todoService, 'updateTodo').mockResolvedValue([ 1 ]);
    const mockReq = {
      params: jest.fn(),
      body: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.putTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: [ 1 ]
    });
  });

  it('should return error when called patchTodo', async () => {
    jest.spyOn(todoService, 'updateTodo').mockRejectedValue(new Error('Internal Server Error'));

    const mockReq = {
      params: jest.fn(),
      body: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.patchTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  });
  
  it('should return integer when called deleteTodo', async () => {
    jest.spyOn(todoService, 'updateTodo').mockResolvedValue(1);
    const mockReq = {
      params: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.putTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      data: 1
    });
  });

  it('should return error when called deleteTodo', async () => {
    jest.spyOn(todoService, 'deleteTodo').mockRejectedValue(new Error('Internal Server Error'));

    const mockReq = {
      params: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await todoController.deleteTodo(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  });
});