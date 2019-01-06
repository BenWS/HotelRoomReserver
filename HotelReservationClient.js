const readLine = require('readline-sync'); // https://www.npmjs.com/package/readline-sync
var HotelReservation = require('./HotelReservation')

var Hotel = HotelReservation.Hotel;
var Customer = HotelReservation.Customer;
var hotel = new Hotel(new HotelReservation.DatabaseClient('Hotel', 'MongoDB://localhost:27017'));

async function Main() {
  var answer = readLine.keyInSelect(['Yes', 'No'], 'Welcome. Are you an existing user? ');
  console.log(answer);

  if (answer == 0) {
    // request user log-in with username, password
    var userName = readLine.question('User Name: ');
    var password = readLine.question('Password: ');
    // var userName = 'benShippey';
    // var password = 'password3';

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

  var roomSizeOptions = ['Small','Medium','Large'];
  var oceanViewOptions = ['Yes','No'];
  var isSmokerOptions = ['Yes', 'No'];

  var startDate = readLine.question('What date do you wish to arrive at the Hotel (MM/DD/YYYY)? ');
  var endDate = readLine.question('What date do you expect to depart from the Hotel (MM/DD/YYYY)? ');
  var roomSize = readLine.keyInSelect(roomSizeOptions,'Which room size do you prefer? ')
  var oceanView = readLine.keyInSelect(oceanViewOptions,'Do you wish for a room with an ocean view? ');
  var isSmoker = readLine.keyInSelect(isSmokerOptions,'Do you smoke cigarrettes?');

  // var startDate = '05/10/2019';
  // var endDate = '05/20/2019';
  // var roomSize = 0;
  // var oceanView = 1;
  // var isSmoker = 0;

  var availableRooms = await hotel.retrieveRooms(roomSizeOptions[roomSize], isSmokerOptions[isSmoker], oceanViewOptions[oceanView], startDate, endDate);

  var roomSelection = readLine.keyInSelect(availableRooms, 'These are the available rooms. Please make a selection: ');
  var reservationCreated = await hotel.createReservation(availableRooms[roomSelection], startDate, endDate, customer.customerID));

  if (reservationCreated) {console.log('Reservation Created')};

}

Main();
