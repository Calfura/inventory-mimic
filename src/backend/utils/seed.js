const { UserModel } = require("../models/UserModel.js");
const { createJwt, validateJwt } = require("./authHelper.js");
const { databaseClear, databaseClose, databaseConnect } = require("./database.js");


async function seedUsers() {

    let userData = [
        {
            username: "User1",
            email: "example1@email.com",
            password: "password"
        },
        {
            username: "User2",
            email: "example2@email.com",
            password: "password"
        },
        {
            username: "User3",
            email: "example3@email.com",
            password: "password"
        }
    ];

    let result = await UserModel.insertMany(userData)
    console.log(result)
    return result;
};

async function seed() {

    await databaseConnect();
    await databaseClear();

    let newUsers = await seedUsers();

    let newJwt = createJwt(newUsers[0]._id)
    console.log("New JWT: " + newJwt);

    validateJwt(newJwt);

    console.log("Database seeded!")
    await databaseClose();
}

seed();
