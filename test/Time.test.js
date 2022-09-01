const assert = require("assert");
const expect = require("chai").expect;
const Money = require("../NodeJS/Money.js");

describe("Currency", () => {
  // Check same currency
  describe(".checkSameCurrency method", () => {
    it("should return 'true' when the 2 currencies are the same", () => {
      // Creating instances of money
      const money1 = new Money("CAD", Math.random());
      const money2 = new Money("CAD", Math.random());
      const isSameCurrency = money1.checkSameCurrency(money2);
      assert.equal(isSameCurrency, true);
    });
    it("should return 'false' when the 2 currencies are not the same", () => {
      const money1 = new Money("CAD", Math.random());
      const money2 = new Money("USD", Math.random());
      const isSameCurrency = money1.checkSameCurrency(money2);
      assert.equal(isSameCurrency, false);
    });
  });

  // Add method
  describe(".add method", () => {
    it("should return the correct value when adding 2 instances of Money", () => {
      const money1 = new Money("CAD", 250);
      const money2 = new Money("CAD", 350);
      const money3 = money1.add(money2);
      assert.equal(money3.value, 600);
    });
    it("should return an error when 2 instances of money do not have the same currency type", () => {
      const money1 = new Money("CAD", Math.random());
      const money2 = new Money("USD", Math.random());
      expect(() => money1.add(money2)).to.throw(
        Error,
        "Currencies are not the same."
      );
    });
  });

  // Min method
  describe(".min method", () => {
    it("should return the correct value when subtracting 2 instances of Money", () => {
      const money1 = new Money("CAD", 250);
      const money2 = new Money("CAD", 350);
      const money3 = money1.min(money2);
      assert.equal(money3.value, -100);
    });
    it("should return an error when 2 instances of money do not have the same currency type", () => {
      const money1 = new Money("CAD", Math.random());
      const money2 = new Money("USD", Math.random());
      expect(() => money1.min(money2)).to.throw(
        Error,
        "Currencies are not the same."
      );
    });
  });

  // Mul method
  describe(".mul method", () => {
    it("should return the correct value when multiplying 2 instances of Money", () => {
      const money1 = new Money("CAD", 2);
      const money2 = new Money("CAD", 3);
      const money3 = money1.mul(money2);
      assert.equal(money3.value, 6);
    });
    it("should return an error when 2 instances of money do not have the same currency type", () => {
      const money1 = new Money("CAD", Math.random());
      const money2 = new Money("USD", Math.random());
      expect(() => money1.mul(money2)).to.throw(
        Error,
        "Currencies are not the same."
      );
    });
  });

  // Div method
  describe(".div method", () => {
    it("should return the correct value when dividing 2 instances of Money", () => {
      const money1 = new Money("CAD", 6);
      const money2 = new Money("CAD", 3);
      const money3 = money1.div(money2);
      assert.equal(money3.value, 2);
    });
    it("should return an error when 2 instances of money do not have the same currency type", () => {
      const money1 = new Money("CAD", Math.random());
      const money2 = new Money("USD", Math.random());
      expect(() => money1.mul(money2)).to.throw(
        Error,
        "Currencies are not the same."
      );
    });
  });

  // Change currency
  describe(".changeCurrency method", () => {
    it("change currency type", () => {
      const money1 = new Money("USD", Math.random());
      money1.changeCurrency("CAD");
      assert.equal(money1.currency, "CAD");
    });
  });

  // Print
  describe(".print method", () => {
    it("should print currency and value", () => {
      const value = Number(Math.random().toFixed(2));
      const money1 = new Money("USD", value);
      assert.equal(money1.print(), `USD ${value.toFixed(2)}`);
    });
  });
});
