const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    priority: {
        type: String,
        required: true,
        emun: ['high', 'medium', 'low'],
    },
    infoTask: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    state: {
        type: Boolean,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TaskSchema.methods.toJSON = function () {
    const { __v, _id, state, ...task } = this.toObject();
    task.uid = _id;
    return task;
}

module.exports = model('Task', TaskSchema);