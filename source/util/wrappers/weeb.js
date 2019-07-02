const { weeb_key } = require('../../../config');
const prototypes = require('../prototypes')
const wrapper = require('weeb-wrapper');
const weeb = new wrapper(weeb_key)
const weebA = async (query, filetype) => {
    try {
        return weeb.random(query, { filetype: filetype})
    } catch (err) {
       console.log(err.message)
    }
}
module.exports = async (query, filetype) => {
    try {
        return weeb.random(query, { filetype: filetype})
    } catch (err) {
        console.log(err.message)
    }
};