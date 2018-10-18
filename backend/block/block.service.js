const config = require('../config');
const db = require('../_helpers/db');
const Block = db.Block;

module.exports = {
    getAll,
    getById,
    create,
};


async function getAll() {
    return await Block.find().select('-hash');
}

async function getById(id) {
    return await Block.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    // if (await Block.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    const user = new Block(userParam);


    // save user
    await user.save();
}
