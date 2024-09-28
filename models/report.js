const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    type_id: { type: Number },
    sub_type_id: { type: Number },
    amount: { type: Number },
    rec_day: { type: Number },
    rec_month: { type: Number },
    rec_year: { type: Number }
});

module.exports = mongoose.model('Report', reportSchema);