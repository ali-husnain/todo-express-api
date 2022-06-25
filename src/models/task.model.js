module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("tasks", {
    name: {
      type: Sequelize.STRING
    },
    is_completed: {
      type: Sequelize.INTEGER
    }
  });
  return Task;
};