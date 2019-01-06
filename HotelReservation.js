//https://mongodb.github.io/node-mongodb-native/
// https://docs.mongodb.com/manual/tutorial/query-documents/
const MongoClient = require('mongodb').MongoClient;

function DatabaseClient(database, connectionURL) {
  this.connectionURL = connectionURL;
  this.database = database;
}

DatabaseClient.prototype.select = async function(collection, filter, fields) {
  var client = await new MongoClient(this.connectionURL).connect();
  var db = await client.db(this.database); //set database
  var collection = await db.collection(collection); //set collection
  var result = await collection.find(filter,{projection:fields}).toArray();
  await client.close();
  return result;
}

DatabaseClient.prototype.delete = function() {

}

DatabaseClient.prototype.update = function() {

}

DatabaseClient.prototype.insert = async function(collection, data) {
  var client = await new MongoClient(this.connectionURL).connect();
  var db = await client.db(this.database); //set database
  var collection = await db.collection(collection); //set collection

  var result = await collection.insertOne(data);
  await client.close();
  return result;
}

function Hotel(databaseClient) {
  this.databaseClient = databaseClient;
}

 Hotel.prototype.retrieveRooms = async function(size, smokingAllowed, oceanView, startDate, endDate ) {
  //return hotel rooms matching query conditions
  var result = await this.databaseClient.select(
    'Reservation'
    , {startDate:{$gte:new Date(startDate)}
        , endDate:{$lte:new Date(endDate)}}
      , {roomID:1});
  var unavailableRooms = result.map(element => element.roomID);

  var result = await this.databaseClient.select(
    'Room'
    , {roomID:{$not:{$in:unavailableRooms}}
      , roomSize:size
      , oceanView:oceanView
      , smokingAllowed:smokingAllowed});

  return result.map(element => element.roomID);
}

Hotel.prototype.createCustomer = function(firstName, lastName, username, password) {
  //create new customer record in database
  return this.databaseClient.insert('Customer',{firstName:firstName, lastName:lastName, username:username, password:password});
}

Hotel.prototype.retrieveCustomer = async function(username, password) {
  //retrieve existing customer record
  var docs = await this.databaseClient.select('Customer',{username:username, password:password});
  var firstName = docs[0].firstName;
  var lastName = docs[0].lastName;
  var customerID = docs[0]._id;
  return new Customer(firstName, lastName, customerID); //create new customer object using retrieved information
}

Hotel.prototype.reservationExists = async function(roomID, startDate, endDate) {
  var result = await this.databaseClient.select(
    'Reservation'
    , {roomID:roomID
      , startDate:{$gte:new Date(startDate)}
      , endDate:{$lte:new Date(endDate)}}
    , {roomID:1});
  var reservedRooms = await result.map(element => element.roomID);
  // console.log(result);

  if(reservedRooms.length == 0) {return false};
  if(reservedRooms.length > 0) {return true};
}

Hotel.prototype.createReservation = async function(roomID, startDate, endDate, customerID) {
  var reservationExists = await this.reservationExists(roomID, startDate, endDate);
  if(reservationExists) {
    return false;
  } else if(!reservationExists) {
    var result = await this.databaseClient.insert('Reservation', {roomID:roomID, startDate:new Date(startDate), endDate:new Date(endDate), customerID:customerID});
    return true;
  }
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
