//constructor function - meant to be called with new to create objects.
//A normal function is just called directly to run some logic and optionally return a value.

function BankAccount(customerName, balance = 0) {
  this.customerName = customerName;
  this.accountNumber = Date.now();
  this.balance = balance;
  this.createdAt = new Date(Date.now());

  this.deposit = function (amount) {
    this.balance += amount;
  };

  this.withdraw = (amount) => {
    this.balance -= amount;
  };
}

/*
You don’t write the object literally. You create it with new:

const rakeshAccount = new BankAccount("Rakesh", 1000);
After that, rakeshAccount is an object - something like:
{
  customerName: "Rakesh",
  accountNumber: 1717...,
  balance: 1000,
  createdAt: Date {...},
  deposit: function () { ... },
  withdraw: function () { ... }
}
*/


const rakeshAccount = new BankAccount("Parship C", 1000);
const johnAccount = new BankAccount("John D");
rakeshAccount.deposit(5000);
johnAccount.deposit(1000);
rakeshAccount.withdraw(2000);

console.log(rakeshAccount, johnAccount);


//=======================================================
const accounts = []
const accountForm = document.querySelector('#accountForm')
const customerName = document.querySelector('#customerName')
const balance = document.querySelector('#balance')

accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const account = new BankAccount(customerName.value, +balance.value) // + is for converting string to number
    accounts.push(account)
    console.log(accounts)
})


/*

1. Constructor Function (Object Creation)
BankAccount acts as a blueprint for creating account objects.
Each instance (new BankAccount(...)) gets its own properties like customerName, balance, etc.

2. Encapsulation
Data (customerName, balance) and behavior (deposit, withdraw) are bundled together inside the object.
Operations on balance are controlled via methods instead of direct manipulation. Our current implementation partially encapsulates data, but
balance is still publicly accessible → account.balance = -1000 is possible ❌
True encapsulation would restrict direct access (using closures or #private fields in classes)

3. Instance Properties vs Methods
Properties: customerName, accountNumber, balance, createdAt
Methods: deposit(), withdraw()
Instance:
const rakeshAccount = new BankAccount("Rakesh", 1000);
const johnAccount  = new BankAccount("John", 500);
Each one is an instance - a separate account object.

4. Dynamic Object Creation from User Input
Form input is used to create real objects dynamically.
Demonstrates how OOP connects with DOM events (submit event).

5. State Management
accounts array stores all created account objects.
Shows how multiple instances can be tracked and managed.

6. Type Conversion
+balance.value converts string input into a number.
Important for maintaining correct data types in object state.

7. Use of this
Refers to the current instance.
Ensures each account operates on its own data.

*/
