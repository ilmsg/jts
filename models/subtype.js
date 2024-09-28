const mongoose = require('mongoose');
const subTypeSchema = mongoose.Schema({
    sub_type_id: { type: Number },
    type_id: { type: Number },
    sub_type_name: { type: String, default: '' }
});

module.exports = mongoose.model('SubType', subTypeSchema);