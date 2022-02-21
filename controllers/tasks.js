const { response } = require("express");

const Task = require('../models/task');
const Priority = require('../models/priority');
const { prioritiesNotExist } = require("../helpers/utils");
const req = require("express/lib/request");

const createTask = async (req, res = response) => {

    const name = req.body.name.toLowerCase();
    const priority = req.body.priority.toLowerCase();
    const infoTask = req.body.infoTask;

    try {

        const taskDB = await Task.findOne({ name });
        if (taskDB) {
            return res.status(400).json({
                msg: `Name ---${taskDB.name}--- is not available`
            });
        }

        const data = {
            name,
            priority,
            infoTask
        }

        const task = new Task(data);

        await task.save();

        res.status(201).json(task);

    } catch (error) {

        console.log(error);

        res.status(409).json({
            msg: 'Unexpected error',
            error: error.error
        });
    }
}

const getTasks = async (req, res = response) => {

    const { priority, completed, limit = 5, from = 1 } = req.query;

    let query = { state: true };

    if (priority) {

        const error = await prioritiesNotExist(priority);

        if (error) {
            return res.status(400).json({
                msg: `--${error}--`
            })
        }

        query = { ...query, priority }
    }

    if (completed) {

        if (completed !== 'true' && completed !== 'false') {
            return res.status(400).json({
                msg: 'Invalid query. Completed must be true|false'
            });
        }

        query = { ...query, completed }
    }

    if (isNaN(+from) || +from < 1) {
        return res.status(400).json({
            msg: 'bad request - from must be an integer stating from 1'
        });
    }

    if (isNaN(+limit) || +limit < 1) {
        return res.status(400).json({
            msg: 'bad request - limit must be an integer stating from 1'
        });
    }

    try {

        const [total, tasks] = await Promise.all([
            Task.countDocuments(query),
            Task.find(query)
                .skip(Number(from - 1))
                .limit(Number(limit))
        ]);


        res.json({
            total,
            tasks
        });

    } catch (error) {

        console.log(error);

        res.status(409).json({
            msg: 'Unexpected error',
            error: error.error
        });
    }
}

const modifyTask = async (req, res = response) => {

    const { id } = req.params;

    let { name, priority, infoTask } = req.body;

    if (!name && !priority && !infoTask) {

        return res.status(400).json({})
    }

    if ( name ) {
        name = name.toLowerCase();
    }

    const error = await prioritiesNotExist(priority);

    if (error && priority) {

        return res.status(400).json({
            msg: `--${error}--`
        })
    }

    try {

        const task = await Task.findByIdAndUpdate(id, { name, priority, infoTask }, { new: true });

        res.json(task);

    } catch (error) {

        res.status(409).json({
            error: error.codeName
        })

    }
}

const patchTaskComplete = async (req, res = response) => {

    const { id } = req.params;

    const { completed } = req.body;

    try {
    
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });

        res.json(task);

    } catch (error) {
        
        console.log(error);

        res.status(409).json({
            msg: 'Unexpected error',
            error: error.error
        });
    }

}

const deleteTask = async (req, res = response) => {

    const { id } = req.params;

    try {

        const task = await Task.findByIdAndUpdate(id, { state: false });

        res.json({
            task
        });

    } catch (error) {

        console.log(error);

        res.status(409).json({
            msg: 'Unexpected error',
            stack: error.error
        })
    }
}

module.exports = {
    createTask,
    getTasks,
    modifyTask,
    patchTaskComplete,
    deleteTask
}