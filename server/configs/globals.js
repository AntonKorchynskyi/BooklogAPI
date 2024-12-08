require("dotenv").config(); // loads current .env file into process.env

const globals = {
    "ConnectionStrings": {
        "MongoDB": process.env.CONNECTION_STRING_MONGODB,
    },
    "Credentials": {
        "Username": process.env.USERNAME_WEB_API_2,
        "Password": process.env.PASSWORD,
    },
    "ApiKeys": {
        "OpenAI": process.env.OPENAI_API_KEY,
    },
}

// make objects available to the rest of the app
module.exports = globals;