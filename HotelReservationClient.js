const readLine = require('readline-sync'); // https://www.npmjs.com/package/readline-sync
var HotelReservation = require('./HotelReservation')

var Hotel = HotelReservation.Hotel;
var Customer = HotelReservation.Customer;
var hotel = new Hotel();

async function Main() {
  // request user log-in with username, password
  var userName = readLine.question('User Name: ');
  var password = readLine.question('Password: ');
  // var userName = 'benShippey';
  // var password = 'password3'
  var customer = await hotel.retrieveCustomer(userName, password);

  console.log(`\rWelcome ${customer.firstName}.`)
  var startDate = readLine.question('What date do you wish to arrive at the Hotel (MM/DD/YYYY)? ');
  var endDate = readLine.question('What date do you expect to depart from the Hotel (MM/DD/YYYY)? ');
  var roomSize = readLine.question('Which room size do you prefer? ')
  var oceanView = readLine.question('Do you prefer having an ocean view? ');

  if(reservationExists(roomID, startDate, endDate)) {
    
  }
}

Main();
