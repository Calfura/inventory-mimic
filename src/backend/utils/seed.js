const { CharacterModel } = require("../models/CharacterModel.js");
const { InventoryModel } = require("../models/InventoryModel.js");
const { UserModel } = require("../models/UserModel.js");
const { createJwt, validateJwt, comparePasswords } = require("./authHelper.js");
const { databaseClear, databaseClose, databaseConnect } = require("./database.js");

// Seeding User database
async function seedUsers() {

    // Test data for database connections.
    let userData = [
        {
            username: "User1",
            password: "password"
        },
        {
            username: "User2",
            password: "password"
        }
    ];

    // Test account for password encryption and salting
    let testUser = {
        username: "Test",
        password: "test"
    }

    console.log("Creation of password test user...")
    let tester = await UserModel.create(testUser);

    console.log("Call on save for password test user...")
    await tester.save();

    console.log("TestUser encrypted password is: " + tester.password);
    let passwordMatchTest = await comparePasswords("TestPassword", tester.password);
    console.log("Tester's password is TestPassword: " + passwordMatchTest);

    let result = await UserModel.insertMany(userData)
    
    console.log(...result, tester)
    return [...result, tester];
};

// Seeding Character database
async function seedCharacters(usersToUse) {
    let characterData = [
        {
            user: usersToUse[0].id,
            name: "Character 1",
            strength: 20,
            maxCarry: 175,
            // charInventory: ""
        },
        {
            user: usersToUse[0].id,
            name: "Character 2",
            strength: 15,
            maxCarry: 125,
            // charInventory: ""
        },
        {
            user: usersToUse[1].id,
            name: "Character 1",
            strength: 10,
            maxCarry: 75,
            // charInventory: ""
        },
        {
            user: usersToUse[2].id,
            name: "Character 1",
            strength: 5,
            maxCarry: 25,
            // charInventory: ""
        }
    ];

    let result = await CharacterModel.insertMany(characterData);
    console.log(result);
    return result;
};

// Seeding inventory database
async function seedInventory(characterToUse) {

    let inventoryData = [
        {
            character: characterToUse[0].id,
            item: "Weapon 1",
            weight: 20,
            description: "Basic weapon"
        },
        {
            character: characterToUse[0].id,
            item: "Potion",
            weight: 2,
            description: "A potion"
        },
        {
            character: characterToUse[0].id,
            item: "Food",
            weight: 31,
            description: "Basic Food stuff"
        },
        {
            character: characterToUse[0].id,
            item: "Shield",
            weight: 51,
            description: "Basic Shield"
        },
        {
            character: characterToUse[1].id,
            item: "Weapon 1",
            weight: 21,
            description: "Basic weapon"
        },
        {
            character: characterToUse[2].id,
            item: "Weapon 1",
            weight: 22,
            description: "Basic weapon"
        },
        {
            character: characterToUse[3].id,
            item: "Weapon 1",
            weight: 23,
            description: "Basic weapon"
        }
    ];

    let result = await InventoryModel.insertMany(inventoryData);
    console.log(result);
    return result;
};

async function seed() {

    await databaseConnect();
    await databaseClear();

    let newUsers = await seedUsers();
    let newCharacters = await seedCharacters(newUsers);
    let newInventory = await seedInventory(newCharacters);

    let newJwt = createJwt(newUsers[0]._id)
    console.log("New JWT: " + newJwt);

    validateJwt(newJwt);

    console.log("Database seeded!")
    await databaseClose();
};

seed();
