// Adding module
const mongoose = require('mongoose');

// Run if Error Occurs
main().catch(err => console.log("Error in conecting: ", err));

// Run if connected succesfully
async function main() {
    // Connecting with mongoose
    await mongoose.connect('mongodb://127.0.0.1:27017/shahzaib');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    console.log("Connected...")

    createUserSchema()

    // addUser("Muhammad Shahzaib", 19)

    printData()
}

var User

function createUserSchema() {
    // Creating Schema
    const usersSchema = new mongoose.Schema({
        fullName: String,
        age: Number
    })

    // Adding Method that is returning user's info
    usersSchema.methods.userInfo = function () {
        return "Name: " + this.fullName + "\nAge: " + this.age
    }

    // Compailing Schema
    User = mongoose.model("user", usersSchema)
}

async function addUser(fullName, age) {
    var user1 = new User({ fullName: "Muhammad Shahzaib", age: 19 })

    // Saving User's data
    await user1.save()
}

async function printData() {
    // Printing Everything in our database
    const userData = await User.find({ fullName: "Muhammad Shahzaib" })
    
    //console.log("Data: ",userData)

    console.log("ALL DATA\n")
    for(let i=0; i<userData.length;i++){
        console.log("User"+(i+1)+" Name: "+userData[i].fullName)
        console.log("User"+(i+1)+" Age: "+userData[i].age)
    }
}