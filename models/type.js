const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    type_id: { type: Number },
    type_name: { type: String, default: '' },
});

module.exports = mongoose.model('Type', typeSchema);