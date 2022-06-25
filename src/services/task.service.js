const db = require("../models");
const Task = db.task;
const moment = require('moment');
const Op = db.Sequelize.Op;

const taskService = {

    create: (req) => {
        return Task.create({
            name: req.body.name,
            is_completed: 0,
            userId: req.userId
        });
    },

    findById: (id) => {
        return Task.findByPk(id);
    },

    deleteById: (id, userId) => {
        return Task.destroy({ where: { id: id, userId: userId } });
    },

    paginateByUser: (userId,offset = 0, limit= 10) => {
        return Task.findAll({
            where: {
                userId: userId
            },
            order: [
                ['id', 'ASC']
            ],
            offset: offset,
            limit: limit
        });
    },

    findAllByUser: (userId) => {
        return Task.findAll({
            where: {
                userId: userId,
            }
        });
    },

    findAllByUserAndRange: (userId, start_date, end_date) => {
        const beginningOfDay = moment(start_date, 'YYYY-MM-DD').startOf('day');
        const endOfDay = moment(end_date, 'YYYY-MM-DD').endOf('day');
        return Task.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.between]: [beginningOfDay, endOfDay]
                }
            },
            order: [
                ['id', 'ASC']
            ],
        });
    },

    markCompleted: (id, userId) => {
        return Task.update(
            { is_completed: 1 },
            { where: { id: id, userId: userId } }
        );
    },

    update: (id, updateName, userId) => {
        return Task.update(
            { name: updateName },
            { where: { id: id, userId: userId } }
        );
    },

};

module.exports = taskService;