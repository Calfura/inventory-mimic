const { UserModel } = require("../models/UserModel");
const { databaseClear, databaseClose } = require("./database");


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

    await databaseConenct();
    await databaseClear();

    let newUsers = await seedUsers();

    console.log("Database seeded!")
    await databaseClose();
}

seed();
