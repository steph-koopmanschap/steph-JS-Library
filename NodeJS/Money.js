class Money {
    constructor(currency, value)
    {
        this.currency = currency;
        this.value = value.toFixed(2);
    }

    add(money2) {
        if (checkSameType(this, money2)) {
            return new Money(this.currency, this.value + money2.value);
        }
        else {
            throw new Error("Currencies are not the same.")
        }
    }

    min(money2) {
        if (checkSameType(this, money2)) {
            return new Money(this.currency, this.value - money2.value);
        }
        else {
            throw new Error("Currencies are not the same.")
        }
    }

    mul(money2) {
        if (checkSameType(this, money2)) {
            return new Money(this.currency, this.value * money2.value);
        }
        else {
            throw new Error("Currencies are not the same.")
        }
    }

    div(money2) {
        if (checkSameType(this, money2)) {
            return new Money(this.currency, this.value / money2.value);
        }
        else {
            throw new Error("Currencies are not the same.")
        }
    }

    checkSameCurrency(money1, money2) {
        if (money1.currency === money2.currency) {
            return true;
        }
        return false;
    }

    changeCurrency(type) {
        this.type = type;
    }

    print() {
        return this.type + " " + this.value;
    }

    //Format:
    //"currency value"
    //The space is important!
    static stringToMoney(string) {
        let splitString = string.split(" ");
        if (splitString.length > 3) {
            throw new Error("Currency not recognized");
        }
        this.currency = splitString[0];
        this.value = parseFloat(splitString[1]).toFixed(2);
    }
}

module.exports = Money;
