require("dotenv").config(); // loads current .env file into process.env

const globals = {
    "ConnectionStrings": {
        "MongoDB": process.env.CONNECTION_STRING_MONGODB,
    }
}

// make objects available to the rest of the app
module.exports = globals;