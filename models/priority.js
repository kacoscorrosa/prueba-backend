const { Schema, model } = require('mongoose');

const PrioritySchema = Schema({
    priority: {
        type: String,
        required: [ true, 'Priority is required' ]
    }

});

module.exports = model( 'Priority', PrioritySchema );