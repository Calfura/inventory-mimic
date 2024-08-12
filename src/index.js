const { app } = require("./server.js");
const { databaseConnect } = require("./backend/utils/database.js");



app.listen(3000, () => {
    databaseConnect();
    console.log("Server running on port 3000")
});