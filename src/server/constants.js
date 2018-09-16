const path = require("path");

module.exports = {
    CLIENT_ROOT: path.join(__dirname, "../client"),

    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY
}
