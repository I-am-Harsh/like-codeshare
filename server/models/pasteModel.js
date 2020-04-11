const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dataSchema = new Schema({
    url : {
        type : String
    },
    text : {
        type : String
    }

})

var Data = mongoose.model('Data',dataSchema);

module.exports = Data;