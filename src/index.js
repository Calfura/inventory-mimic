const { app } = require("./utils/server.js");
const { connect } = require("./utils/database.js");



app.listen(3000, () => {
    connect();
    console.log("Server running on port 3000")
})