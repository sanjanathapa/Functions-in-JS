'use strict';

//-------------Default Parameters---------
//create a function and pass in 3 arguments for booking
//use this data to create an object and push that into some bookings array.
//default values can contain any values (like in price) and we can use the values of other parameters that were set before it
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 100 * numPassengers
  //price = 100*2
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH1');
createBooking('LH1', 3, 200);
createBooking('LH1', 4);
createBooking('LH1', 5);
//cant skip any arguments
createBooking('LH123', undefined, 1000);

//------------------------------------------------------------------------------------------------------------------
//-------------------------------How Passing Arguments works: Value Vs Reference------------------------------------
//------------------------------------------------------------------------------------------------------------------

//How primitives and objects(references) works on context of functions
const flight = 'LH234';
const Jonas = {
  name: 'Sanjana Thapa',
  passport: 23654179633,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Miss ' + passenger.name;

  if (passenger.passport === 23654179633) {
    alert('Checked In');
  } else {
    alert('Wrong Password');
  }
};
checkIn(flight, Jonas);
console.log(flight);
console.log(Jonas);
//so passing a primitive type to a function is really just the same as creating a copy like this outside the function

const flightNum = flight;
//so the vlaue is simply copied
//when we pass an object to the functin, it just copying an objectlike this
const passenger = Jonas;
//whatever we change in a copy will also happen in the original.

//Interaction of different object with the same object can create an issues
const newPassword = function (person) {
  person.passport = Math.trunc(Math.random) * 1000000000;
};
newPassword(Jonas);
checkIn(flight, Jonas);

//Javascript does not have passing by reference, only passing by value, even though it looks passing by reference.

//------------------------------------------------------------------------------------------------------------------
//***************************First Class Vs Higher Order function*********************************************** */
//------------------------------------------------------------------------------------------------------------------
//First Class function:-
//in technical terms it means that the function are so called first citizens.
//it means that they are simply treates as a value.
//functions are just another type of objects in javascript.
//can also pass function as arguments to other function.
//Now the fact that JS has first-class functions makes it possible for us to use and write Higher Order Functions.

//-------------------------------------------------------------------------------------------------------
//********************************Higher Order Functions*************************************************
//-------------------------------------------------------------------------------------------------------
//A function that receives another fnction as an arguments, or that returns a new function, or both.(only possible
//becz of first- class func.)

//Higher Order Function Practice--------OR-------Functions Accepting callback function
const newWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`original String: ${str}`);
  console.log(`Transformed String:  ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best', newWord);
//how we want the transformer func. now to do with this string, is to transform the string using this function.

//Js uses callback all the time
const high5 = () => {
  console.log('HELLO');
};

document.body.addEventListener('click', high5);
['Joans', 'Sanjana', 'Rohit'].forEach(high5);

//Callback functions allows us to create abstraction. So abstraction means that we hide the detail of some code
//implementation becz we dont really care about all that detail.
//in oue example here, the transformer function doesnt care at all how the string is transformed. it doesnt care about
// this level of detail. all that wants to do is to transform a string. but it doesnt care how it should do it

//------------------------------------------------------------------------------------------------------------------
//**********************************Function returning other functions******************************************** */
//------------------------------------------------------------------------------------------------------------------

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('hello Miss');
greeterHey('Sanjana');
greeterHey('Kavita');

//this greeterHey is essentially that return wala function. so our first func. greet returned a new function that we
//stored  into this 'greeterHey' variable
// const greeterHey = return function(name) { console.log(`${greeting} ${name})`}
//so this greetHey variable is now just a function. so which means we can now call this greeter function
//just as if it was any other function that we defined ourselves.

//this happens beacuse of closures
// we can do it in a one go too:
greet('Hey')('Sharin');

//challenge
//returning one arrow function returning another arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hey')('Anmol');

//------------------------------------------------------------------------------------------------------------------
//***************************************The call and apply method********************************************** */
//------------------------------------------------------------------------------------------------------------------
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings1: [], //to add a new object to our bookings from the book method
  book(flightNum1, name1) {
    console.log(
      `${name1} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum1}`
    );

    this.bookings1.push({ flight: `${this.iataCode}${flightNum1}`, name1 });
  },
};
lufthansa.book(111, 'Sanjana');
lufthansa.book(112, 'Kavita');
console.log(lufthansa);

//lets say after some years lufthansa Group created a new airline with the same method for bookings

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EU',
  bookings1: [],
};

const bookk = lufthansa.book; // now here bookk is not a method(but a regular function) anymore but copy of lufthansa.book

//does NOT work
//bookk(212, "Gourav");

// here "this" keyword will throw an error becz here bookk is now a regular function and this keyword doesnt work on regular functions. so

//so if we want to book for lufthansa flight then the "this" keyword should point to the lufthansa
//but if we want to book a Euroeings flight then the "this" keyword should point to eurowings object.

//so to achieve this thing we have 3 function methods to do it.
// call, apply, bind

//call method
bookk.call(eurowings, 123, 'Sahil');
console.log(eurowings);
//so what happened is we did first actually called the call method and then this call method which will call the book
//function with the "this" keyword set to eurowings as a first arguments in the call method. and rest arguments will
//be the values of the original function itself.

//so this allow us to manually and explicitly set the "this" keyword of any function that we want to call.

bookk.call(lufthansa, 566, 'William Smith');

const swiss = {
  airline: 'SWISS',
  iataCode: 'SW',
  bookings1: [],
};

bookk.call(swiss, 999, 'Harry Potter');

//apply method
//apply method also works the same as the call method. The only difference is that the apply method doesnt recieve
//list of arguments, it take the first argument of "this" keyword , but instead it gonna takes an array of the arguments.

const newFlight = [222, 'Merry Coooper '];
//bookk.apply(swiss, newFlight);
bookk.call(swiss, ...newFlight);
console.log(swiss);

//bind method
//it also works the same as call and apply mehods do. difference is that bind doesnt immediately call the function instead
// it return a new function where "this" keyword is already bound.

const bookEW = bookk.bind(eurowings); //bookEW is now a new function.
bookEW(565, 'TanaJi');

const bookLH = bookk.bind(lufthansa);
const bookSW = bookk.bind(swiss);

//if we want to preset the arguments
const bookEW23 = bookk.bind(eurowings, 23);
bookEW23('Ranvir Singh');
bookEW23('Deepika');

//bind method --when we use objects together with event listener
//as we know that in DOM the "this" keyword always points to the element of the DOM

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//partial application means to preset the parameters
//suppose there is some tax added in every booking so;
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//suppose VAT has a fixed rate, so
const addVat = addTax.bind(null, 0.23); //becz first argument is always "this" keyword, here is no this keyword so defining null
// addVat = value => value + value*0.23;

console.log(addVat(100));
console.log(addVat(23));

//doing same thing but in the manner of Function returning another function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

//Coding Challenge #1

//1. creating a method called 'registerNewAnswer' on the poll object
const poll = {
  question: 'What is your favourite programming language ?',
  options: ['1: Javascript', '2: Python', '3: Rust', '4: c++'],

  // This will generate [0,0,0,0].
  answersArray: new Array(4).fill(0),

  registerNewAnswer() {
    // Get Answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write Option Number)`
      )
    );
    console.log(answer); //2
    console.log(this.answersArray, '@@@@@@@@@@!!!!!!!!!!!!!1111');

    //Register answer
    typeof answer === 'number' &&
      answer < this.answersArray.length &&
      this.answersArray[answer]++;

    console.log('@@@@@@@@@@@@@@@@@@@@', this.answersArray[answer]); //1
    console.log(this.answersArray); //[0,0,0,1]
    this.displayResults('string');
  },
  //creating method to display the poll result
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answersArray);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answersArray.join(', ')}`);
    }
  },
};

//poll.registerNewAnswer();

//call that method whenever clicks the "Answer poll" button.
//the (poll.regusterNewAnswer inside the addeventListener)we need to bind the "this" keyword. i.e we need to set it to the poll object
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//using displayResults method, show the following array as answers.
//[5,2,3]
//[1,5,3,9,6,1]

poll.displayResults.call({ answersArray: [5, 2, 3] });
poll.displayResults.call({ answersArray: [5, 2, 3] }, 'string');
poll.displayResults.call({ answersArray: [1, 5, 3, 9, 6, 1] }, 'string');

//****************************************** */
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

//IIFE to execute the function immediately just once
(function () {
  console.log('this will never run');
  const isPrivate = 23;
})();
//console.log(isPrivate);
//for arrow function
(() => console.log('this will ALSO never run again'))();

//why this IIFE pattern created
//to hide varibales

//------------------------------------------------------------------------------------------------------------------
//*******************************************CLOSURES************************************************** */
//------------------------------------------------------------------------------------------------------------------
//A function has access to the variable environment(VE) of the execution context in which it was created.
//Closure: VE attached to the function, exactly as it was at the time and place the function was created.

//-----Definitions of closure---
// 1.A closure is the closed-over variable environment of the execution context in which a function was created, even
//after that EC is gone.

//A closure gives a fnction access to all the variables of its parents function, even after that parent function has
//returned. The function keeps a reference to its outer scope, which preserve the scope chain throughout time.

//a closure makes sure that a function doesnt loose connection to variables that existed at the function's birthplace.

//a closure is like a backpack that a function carries around wherever it goes. this backpack has all the variables
//that were present in the environment where the function was created.

//--we do NOT have to manually create the closures, this is a javascript features that happens automatically. we cant
//even access closed-over variables explicitly.
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
console.dir(booker);

//Closure example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    //reassigning the f variable
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

//Re-assigning the f function
h();
f();
console.dir(f);
console.log(h);
//where you reassigned functions even without returning them, so remember this also will craete a closure
//so the f function doesnt loose the connection of the variables of its birthplace(i.e where that f function is
//created).

//the closure even has priority over the scope chain.
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`will start boarding in ${wait} seconds`);
};

//const perGroup = 1000; //console up the upper const perGroup to check the priority of closure over scope chain.
boardPassengers(180, 3);

const sum = (a, b) => {
  const c = a + b;
  function reduce1(c, d) {
    const reduced = d - c;
    console.log('Value after deduction is ', reduced);
  }
  reduce1(c, 100);
  const sumValue = a + b;
  console.log('Sum value is', sumValue);
};

sum(10, 20);

//**************************END OF SECTION**********************
