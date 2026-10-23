/** Exercise 01 - Coins **/

// Add your function here
const calculateChange = function calcMinCoinChange(cost) {
  if (cost > 100) return "Error: the number is too large";
  if (cost === 0) return "No change needed";
  if (cost < 0) return "Error: the number is too small";

  cost = Math.round(cost * 100); // change to int -- help with rounding errors

  let change = { dollar: 0, quarter: 0, dime: 0, nickel: 0, penny: 0 };

  change.dollar = Math.trunc(cost / 100);
  cost %= 100;

  change.quarter = Math.trunc(cost / 25);
  cost %= 25;

  change.dime = Math.trunc(cost / 10);
  cost %= 10;

  change.nickel = Math.trunc(cost / 5);
  cost %= 5;

  change.penny = cost;

  return Object.entries(change)
    .filter(([, cnt]) => cnt > 0)
    .map(([coin, cnt]) => {
      const name = cnt === 1 ? coin : coin === "penny" ? "pennies" : `${coin}s`;
      return `${cnt} ${name}`;
    })
    .join(", ");
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(1.15)); // bad rounding
console.log(calculateChange(99.99)); // max valid
console.log(calculateChange(0)); // min valid (?)
console.log(calculateChange(-0.01)); // invalid -- too low (?)
