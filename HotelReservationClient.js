const readLine = require('readline-sync'); // https://www.npmjs.com/package/readline-sync
var HotelReservation = require('./HotelReservation')

var Hotel = HotelReservation.Hotel;
var Customer = HotelReservation.Customer;
var hotel = new Hotel(new HotelReservation.DatabaseClient('Hotel', 'MongoDB://localhost:27017'));

async function Main() {
  /*TEMPORARY: NEXT STEPS

  1) Require user to
    a) Log in
    b) Create new account
  2) Require user to specify action
    Cancel Reservation
    Create Reservation
  2) Request
    Arrival Date
    Departure Date
    Preferred Room Sizes
    Ocean view
    Smoker/Non-Smoker
  3) Provide user available rooms for given criteria
  4) Save user's selection to the database
  5) Allow user to
    Create Reservation
    Cancel Reservation
    Exit Program
  */

  // var answer = readLine.keyInSelect(['Yes', 'No'], 'Welcome. Are you an existing user? ');
  console.log(answer);

  if (answer == 0) {
    // request user log-in with username, password
    var userName = readLine.question('User Name: ');
    var password = readLine.question('Password: ');

    var customer = await hotel.retrieveCustomer(userName, password);
  }

  if (answer == 1) {
    //require user to provide username, password for new account
    var firstName = readLine.question('First Name: ');
    var lastName = readLine.question('Last Name: ');
    var userName = readLine.question('User Name: ');
    var password = readLine.question('Password: ');

    await hotel.createCustomer(firstName, lastName, userName, password);
    var customer = await hotel.retrieveCustomer(userName, password);
  }

  console.log(`\rWelcome ${customer.firstName}.`)
  var startDate = readLine.question('What date do you wish to arrive at the Hotel (MM/DD/YYYY)? ');
  var endDate = readLine.question('What date do you expect to depart from the Hotel (MM/DD/YYYY)? ');
  var roomSize = readLine.question(['Small','Medium','Large'],'Which room size do you prefer? ')
  var oceanView = readLine.question(['Yes','No'],'Do you wish for a room with an ocean view? ');
  var isSmoker = readLine.question(['Yes', 'No'],'Do you smoke cigarrettes?');

  var rooms = hotel.retreiveRooms(size, smokingAllowed, oceanView, startDate, endDate);
}

Main();
