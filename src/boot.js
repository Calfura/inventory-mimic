const { app } = require("./Database/utils/server.js");
const { databaseConnect } = require("./Database/utils/database.js");



app.listen(3000, () => {
    databaseConnect();
    console.log("Server running on port 3000")
});