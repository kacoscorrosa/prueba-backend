const Priority = require('../models/priority');

const prioritiesNotExist = async (priority = '') => {

    try {

        const priorityExist = await Priority.findOne({ priority });

        if (!priorityExist) {

            const queryPriorities = await Priority.find();
            const allpriorities = queryPriorities.map(p => p.priority);

            return `Invalid priority. Allowed: [${allpriorities}]`;
        }

    } catch (error) {

        return 'Unexpected error'

    }

    return undefined
}

module.exports = {
    prioritiesNotExist
}