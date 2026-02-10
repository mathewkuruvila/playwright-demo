let person = {
    first: "John",
    last: "Doe"
}

function greet() {
    console.log( `Hello, ${person.first} ${person.last}!` );
}

function changeName(p, newFirst, newLast) {
    p.first = newFirst;
    p.last = newLast;
}

greet(); // Initial greeting
changeName(person, "Jane", "Smith"); // Change name 
greet(); // Greeting after name change
