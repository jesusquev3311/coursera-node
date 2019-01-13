const assert = require('assert');

//insert document
exports.insertDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);

    coll.insert(document, (err, result)=>{
        assert.equal(err, null);
        console.log(`Inserted ${result.result.n} documents into the collection ${collection}`, callback(result));
    });



};

//find document
exports.findDocument = (db, collection, callback) =>{
    //take the collection from the database
    const coll = db.collection(collection);

    coll.find({}).toArray((err, result)=>{
        assert.equal(err, null);
        callback(docs);
    });


}

//remove document 
exports.removeDocument = (db,document,collection, callback) =>{
    //take the collection from the database
    const coll = db.collection(collection);

    coll.deleteOne(document, (err, result) =>{
        assert.equal(err, null);
        console.log(`Removed the document ${document}`);
        callback(result);
    });
}

//updata document
exports.updateDocument = (db, document, collection, callback) =>{
    //take the collection from the database
    const coll = db.collection(collection);

    coll.updateOne(document, {$set: update}, null, (err, result) =>{
        assert.equal(err, null);
        console.log(`Updated document with ${update}`)
        callback(result);
    });

}