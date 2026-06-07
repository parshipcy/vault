//constructor function
function BankAccount(customerName, balance = 0) {
    this.customerName = customerName;
    this.accountNumber = Date.now();
    this.balance = balance;

    // this.deposit = function (amount) {
    //   this.balance += amount;
    // };

    // this.withdraw = (amount) => {
    //   this.balance -= amount;
    // };

    // Q: Why are deposit and withdraw commented out here?
    // A: So we can put those methods on BankAccount.prototype instead.
    //    Both approaches work, but prototype methods are shared by ALL instances
    //    (one copy in memory), while methods inside the constructor are copied
    //    onto every new object (more memory usage).
    //---------------------------------------------------
    // Imagine you create 3 accounts:
    // const a1 = new BankAccount("Rakesh");
    // const a2 = new BankAccount("John");
    // const a3 = new BankAccount("Sara");

    // Inside constructor: each account gets its own copy of deposit.
    // → 3 accounts = 3 separate deposit functions in memory.

    // On prototype: there is one deposit on BankAccount.prototype.
    // → All 3 accounts share that same function.
}

const rakeshAccount = new BankAccount("Rakesh");

// BankAccount.prototype.test = "this is test";
BankAccount.prototype.deposit = function (amount) { //define deposit on the prototype
    this.balance += amount;
};

rakeshAccount.deposit(1000);
console.log(rakeshAccount);


/*
BankAccount.prototype.deposit = function (amount) {
    this.balance += amount;
};
rakeshAccount.deposit(1000);
Here:

deposit is a method
It’s a function attached to an object (via prototype)
You call it on the object: rakeshAccount.deposit(1000)

---

BankAccount = the blueprint / constructor (the “class” idea)
rakeshAccount = one instance - an actual account object
So instance = a specific object made with new.
*/

/*
=======================================================
PROTOTYPE - QUESTIONS & ANSWERS
=======================================================

---
// Q: What is `prototype` on a function?
// A: Every function in JavaScript automatically gets a special property called `prototype`.
//    It is usually an empty object `{}` at first.
//    We can attach shared methods/properties to it, and every instance created with `new`
//    will be able to use them.

---

// Q: Can we use an arrow function for deposit/withdraw inside the constructor?
// A: No. Arrow functions do NOT have their own context.
//    Inside a constructor, `this` must point to the new object being created.
//    An arrow function would look up `this` from the outer scope (often `windowm object`
//    in browsers), so it would NOT update the account's balance correctly.

---

Q1: What is prototype chaining?
A:  When you access a property on an object (like rakeshAccount.deposit),
    JavaScript first looks on the object itself.
    If it is not found, JavaScript follows the hidden link `[[Prototype]]`
    (exposed as `__proto__`) to the constructor's `prototype` object.
    If still not found, it keeps going up the chain until it reaches `null`.

    Example chain for rakeshAccount.deposit:
    rakeshAccount  →  BankAccount.prototype  →  Object.prototype  →  null

    That is why rakeshAccount.deposit(1000) works even though `deposit`
    is not defined inside the constructor - JS finds it on the prototype.

    When you call rakeshAccount.deposit(1000):
    JS searches like this:
    Is deposit on rakeshAccount? → No (it was commented out in constructor)
    Is deposit on BankAccount.prototype? → Yes

---

Q2: Array and Object are built-in constructors - what does that mean?
A:  Just like BankAccount is our custom constructor, JavaScript has built-in ones:
    - Array  →  creates arrays  →  methods like .push(), .map() live on Array.prototype
    - Object →  creates objects →  methods like .toString() live on Object.prototype

    So when you write [1, 2, 3].push(4), JS uses the same prototype idea:
    the array instance looks up .push on Array.prototype.

---

Q3: deposit is commented out in the constructor - can we call
    BankAccount.deposit(1000) directly (without prototype)?
A:  No. `BankAccount.deposit` does not exist unless you assign it yourself.

    BankAccount is just a function. The `deposit` method lives on
    BankAccount.prototype, not on BankAccount itself.

    These are different:
    - BankAccount.prototype.deposit   ✅ define the shared method here
    - rakeshAccount.deposit(1000)     ✅ call on an instance (uses prototype chain)
    - BankAccount.deposit(1000)       ❌ not defined - BankAccount is not an account

    You always call instance methods on an instance: rakeshAccount.deposit(1000).
    Inside the method, `this` becomes that instance.

=======================================================
KEY TAKEAWAY
=======================================================
- Constructor  → sets up each instance's own properties (this.customerName, etc.)
- Prototype    → stores shared methods (one copy, all instances use it)
- Prototype chain → how JS finds a method when it is not on the object itself
*/
