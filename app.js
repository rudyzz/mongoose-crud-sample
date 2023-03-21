// This is a code sample for CRUD MongoDB using Mongoose

// Connect to DB

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');

// Create schema & model

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// Demo for insertMany and save

async function insertFruit(fruit) {
    try {
        await fruit.save();
    } catch (error) {
        console.log(error);
    }
}

const banana = new Fruit({
    name: "Banana",
    score: 8,
    review: "Just bananas"
});

const apple = new Fruit({
    name: "Apple",
    score: 4,
    review: "Just apples"
});

const grape = new Fruit({
    name: "Grape",
    score: 2,
    review: "Just grapes"
});

// Fruit.insertMany([banana, apple, grape]);

const john = new Person({
    name: "John",
    age: 30
});

// john.save().then( () => console.log("This is John") );


// Demonstration for query/find
async function findAllFruits() {
    try {
        const fruits = await Fruit.find({});
        fruits.forEach(element => {
            console.log(element);
        });
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close()
    }
}

// findAllFruits();

// Demonstration of data validation

const strawberry = new Fruit({
    name: "Strawberry",
    score: 100,
    review: "Strawberries!!!"
});

const mystery = new Fruit({
    score: 5,
    review: "Tastes mysterious..."
});

// insertFruit(strawberry);
// insertFruit(mystery);


// Demonstration for updateOne
const rottenAvocado = new Fruit({
    name: "rottenAvocado",
    score: 1,
    review: "Ewwwww"
});

// insertFruit(rottenAvocado);
updateFruit("6419f36eddddc8759d29be20", {name: "Avocado", score: 10, review: "That's much better"});
updateFruit("6419f00781eb9d022844fcca", {name: "Ababichikuwasa"} );

async function updateFruit(id, updatedInfo) {
    try {
        // first_param: query
        // second_param: updating targets
        await Fruit.updateOne( {_id: id}, updatedInfo );
        console.log("Successfully updated!");
    } catch (error) {
        console.log(error);
    }
}

// Demonstration for deleting

deleteFruit("6419efe6a8fe7e70a4fffcf5");

async function deleteFruit(id) {
    try {
        // first_param: query
        // second_param: updating targets
        await Fruit.deleteOne( {_id: id} );
        console.log("Successfully deleted!");
    } catch (error) {
        console.log(error);
    }
}


// Demo for relationship
const peach = new Fruit({
    name: "Peach",
    score: 9,
    review: "Like it"
});
peach.save().then(console.log("Peach added"));

const peter = new Person({
    name: "Peter",
    age: 20,
    favoriteFruit: peach
});
// peter.save().then(console.log("Peter added"));
updateFavFruit("John", banana);
async function updateFavFruit(name, fruit) {
    try {
        await Person.updateOne({name: name}, {favoriteFruit: fruit});
        console.log("John loves bananas");
    } catch (error) {
        console.log(error);
    }
}

// mongoose.connection.close();

