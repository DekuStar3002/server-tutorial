const todoModel = (id, name, isCompleted) => {
  return {
    id: id,
    name: name,
    isCompleted: isCompleted,
  };
};

module.exports = todoModel;