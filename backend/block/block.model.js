const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    index: { type: Number, unique: true, required: true },
    previousHash: { type: String, required: true },
    timestamp: { type: Number, required: true },
    data: { type: Object, required: true },
    hash: { type: String, },
    nonce:{ type: Number },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Block', schema);