const { app } = require("./server.js");
const { databaseConnect } = require("./backend/utils/database.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    databaseConnect();
    console.log("Server running on port 3000")
});