const MongoClient = require('mongodb').MongoClient;

var connectionURL = 'MongoDB://localhost:27017'
var mongoClient = new MongoClient(connectionURL);

function Hotel() {

}

 Hotel.prototype.getRooms = function(size, smokingAllowed, oceanView ) {
  //return hotel rooms matching query conditions
}

Hotel.prototype.createCustomer = function(username, password) {
  //create new customer record
}

Hotel.prototype.retrieveCustomer = async function(username, password) {
  //retrieve existing customer record
  var client = await mongoClient.connect();
  var db = await client.db('Hotel'); //set database
  var collection = await db.collection('Customer'); //set collection

  var docs = await collection.find({username:username, password:password}).limit(1).toArray();
  var firstName = docs[0].firstName;
  var lastName = docs[0].lastName;
  var customerID = docs[0].customerID;

  await mongoClient.close();
  return new Customer(firstName, lastName, customerID); //create new customer object using retrieved information
}

Hotel.prototype.reservationExists = function(roomID, startDate, endDate) {

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
