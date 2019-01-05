const MongoClient = require('mongodb').MongoClient;

//https://mongodb.github.io/node-mongodb-native/
// https://docs.mongodb.com/manual/tutorial/query-documents/
var connectionURL = 'MongoDB://localhost:27017'
var mongoClient = new MongoClient(connectionURL);

function DatabaseClient(database, connectionURL) {
  this.mongoClient = new MongoClient(connectionURL);
  this.database = database;
}

DatabaseClient.prototype.select = async function(collection, filter) {
  var client = await this.mongoClient.connect();
  var db = await client.db(this.database); //set database
  var collection = await db.collection(collection); //set collection

  var result = await collection.find(filter).toArray();
  await client.close();
  return result;
}

DatabaseClient.prototype.delete = function() {

}

DatabaseClient.prototype.update = function() {

}

DatabaseClient.prototype.insert = async function(collection, data) {
  var client = await this.mongoClient.connect();
  var db = await client.db(this.database); //set database
  var collection = await db.collection(collection); //set collection

  var result = await collection.insert(data);
  await client.close();
  return result;
}

function Hotel(databaseClient) {
  this.databaseClient = databaseClient;
}

 Hotel.prototype.getRooms = function(size, smokingAllowed, oceanView ) {
  //return hotel rooms matching query conditions
}

Hotel.prototype.createCustomer = function(username, password) {
  //create new customer record

}

Hotel.prototype.retrieveCustomer = async function(username, password) {
  //retrieve existing customer record
  var docs = await this.databaseClient.select('Customer',{username:username, password:password});
  var firstName = docs[0].firstName;
  var lastName = docs[0].lastName;
  var customerID = docs[0].customerID;
  return new Customer(firstName, lastName, customerID); //create new customer object using retrieved information
}

Hotel.prototype.reservationExists = async function(roomID, startDate, endDate) {
  var result = await this.databaseClient.select(
    'Reservation'
    , {roomID:roomID
      , startDate:{$gte:new Date(startDate)}
      , endDate:{$lte:new Date(endDate)}});
  console.log(result);
}

Hotel.prototype.createReservation = function(roomID, startDate, endDate, customerID) {

}

function Customer(firstName, lastName, customerID) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.customerID = customerID;
}

 Customer.prototype.requestReservation = function(roomID, startDate, endDate) {
   //attempt to book hotel
 }

 Customer.prototype.cancelReservation = function(roomID, startDate, endDate) {
 }

module.exports.Customer = Customer;
module.exports.Hotel = Hotel;
module.exports.DatabaseClient = DatabaseClient;
