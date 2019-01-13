const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

const dbOper = require('./operations');

MongoClient.connect(url).then( (client) => {


    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dbOper.insertDocument(db, {name: "Vadonut", description: "test"},"dishes").then((result) => {
        console.log("Insert Document:\n", result.ops);

        return dbOper.findDocuments(db, "dishes")
    })

    .then((docs) =>{
        console.log("Found Documents:\n", docs);
        return dbOper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Description"},"dishes")
    })

    .then( (result) =>{
        console.log(`Updated document: \n ${result.result}`);

        return dbOper.findDocuments(db, "dishes")
    })

    .then((docs) =>{
        console.log(`Found Updated documents: ${docs}`);

        return db.dropCollection("dishes")
    })

    .then( (result) =>{
        console.log(`Dropped collction: ${result}`);
        client.close();
    })
    .catch( (err) => console.log(err));

})
.catch( (err) => console.log(err));