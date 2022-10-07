//Utility class
class Utility {
    //=================================
    //=========UTILITY FUNCTIONS=======
    //=================================

    //returns a random integer between min and max
    static randIntRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static randFloatRange(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    //Returns a random Hex color
    static getRandomColorHex() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    //Returns a random rgb color in either number array format or string format
     //if isReturnStr = true then return string, if not return number array
    static getRandomColorRGB(isReturnStr=true) {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        if (isReturnStr) {
            return `rgb(${r}, ${g}, ${b})`;
        }
        return [r, g, b];
    }

    //Returns a random string specified by strLength containing the letters a-z, A-Z, 0-9 
    //By default it will return 1 string. 
    //If you set numOfStrings to a number higher than 1 then the functin will return an array of strings
    //The amount of strings in the array is specified by numOfStrings
    static getRandomString(strLength, numOfStrings=1) {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randStr = "";
        let strArray = [];

        for (let i = 0; i < numOfStrings; i++) {
            for (let i = 0; i < strLength; i++) {
                randStr += chars[Math.floor(Math.random() * chars.length)];
            }
            strArray.push(randStr);
        }
        if (numOfStrings === 1) {
            return strArray[0];
        }
        return strArray;
    }

    //Returns a random number in string format specified by numLength containing the digits 1-9
    //If you set numOfnums to a number higher than 1 then the function will return an array of numbers in string format
    //The amount of (string) numbers in the array is specified by numOfnums
    static getRandomNumber(numLength, numOfnums=1) {
        let digits = "0123456789";
        let randNum = "";
        let numStrArray = [];

        for (let i = 0; i < numOfnums; i++) {
            for (let i = 0; i < numLength; i++) {
                randNum += digits[Math.floor(Math.random() * digits.length)];
            }
            //Make sure the first digit is not zero
            while (randNum !== '0') {
                randNum[0] = digits[Math.floor(Math.random() * digits.length)];
            }
            numStrArray.push(randNum);
        }
        if (numOfnums === 1) {
            return numStrArray[0];
        }
        return numStrArray;
    }

    //Convert degrees to radians
    static degreeToRadian(degrees) {
        return degrees * (Math.PI/180);
    } 
    
    static bytesToKB(bytes) {
        return bytes / 1024;
    }

    static bytesToMB(bytes) {
        return bytes / 1048576;
    }
        
	//This function transforms a date object to a string format.
	//date is a Date object. 
	//To format today's date, input (new Date()) as the first parameter
	//seperator specifies the character to seperate the dates.
	//format can either be 3 formats and will specify in which format the date string will be returned
	//"YYYY-MM-DD"
	//"DD-MM-YYYY"
	//"MM-DD-YYYY"
	static formatDateToStr(date, format="DD-MM-YYYY", seperator="-") {
		switch(format) {
		case "YYYY-MM-DD":
			return (date.getFullYear() + seperator + (date.getMonth()+1) + seperator + date.getDate());
		case "DD-MM-YYYY":
			return (date.getDate() + seperator + (date.getMonth()+1) + seperator + date.getFullYear());
		case "MM-DD-YYYY":
			return ((date.getMonth()+1) + seperator + date.getDate() + seperator + date.getFullYear());
		default: 
			return "Error: Date format not correct."
		}
	}

    //This function transforms a date object to a string format.
	//date is a Date object. 
    //To format the time of the date object, input (new Date()) as the first parameter
    //seperator specifies the character to seperate the times.
    //FORMAT:
    //HH:MM:SS
    static formatTimeToStr(date, seperator=":") {
        return date.getHours() + seperator + date.getMinutes() + seperator + date.getSeconds();
    }
	
	//Returns a random number in string format containing the digits 0-9, where the 1st digit is never 0.
	//The amount of digits is deterimined by the numLength. (Default = 32)
	//With numLength=32 the chance of generating an identical ID for 2 different function calls is extremely unlikely.
	//The lower numLength the more likely 2 identical ID's will be generated.
	static generateID(numLength=32) {
		let digits = "0123456789";
		let randNum = "";
		for (let i = 0; i < numLength; i++) {
		    if (i === 0) {
		        //Prevent first digit from being zero
		        randNum += digits[Math.floor(Math.random() * (digits.length - 1 + 1)) + 1];
		    }
		    randNum += digits[Math.floor(Math.random() * digits.length)];
		}
		return randNum;
	}
		
    //Adds commas to long numbers every 3 digits
    //For example 123456789 becomes 123,456,789
    static formatNumber(number) {
        // Get rid of the decimals and convert to a string.
        let numStr = String(Math.floor(number));
    
        // Starting 3 from the end, add a comma every 3 digits.
        for (let i = numStr.length - 3; i > 0; i -= 3) {
        numStr = numStr.slice(0, i) + ',' + numStr.slice(i);
        }
    
        return numStr;
    }
    
    //returns a string where the first character of the input string is always uppercase
    static firstCharUpperCase(input) {
        return input[0].toUpperCase()+input.substr(1);
    }
    
    //Counts the number of words in a string (assuming words are sperated by whitespace)
    static wordCount(str) {
        let strArray = str.split(' ');
        //count words
        let count = 0;
        strArray.forEach((word) => {
        count += 1;
        });
        return count;
    }
    
    //Returns an array, wich includes items that exist in both firstArray AND secondArray
    //For example arr1 = ["Hello", "World", "I", "Love", "Pizza"] arr2 = ["Hello", "Mars", "I", "Love", "Fruit"]
    //returns: ["Hello", "I", "Love"];
    static checkBothArrayItems(arr1, arr2) {
        const bothItems = (arr1, arr2) => arr1.filter(item => arr2.includes(item));
        return bothItems;
    }
    
    //Turns a string of value to an arrary and returns it.
    //For example "apple,mango,papaya" or "apple, mango, papaya" becomes ["apple", "papaya", "mango"]
    //if isNum = true then it returns an arrary numbers.
    //For example "1,2,3" becomes [1, 2, 3]. If isNum is false it becomes ["1", "2", "3"]
    static stringToArray(str, isNum=false) {
        //first remove all white spaces
        str = str.replaceAll(' ', '');
    
        if (isNum) {
        //turn string into array of numbers
        return str.split(',').map(Number);
        }
        //turn string into array of strings
        return str.split(',');
    }
    
    //Returns the hamming distance between 2 two equal-length strings 
    //"karolin" and "kathrin" returns 3.
    static hammingDistance(str1, str2) {
        if (str1.length === str2.length) {
        let dist_counter = 0;
        //add +1 everytime a character is different in the strings
        for (i = 0; i < str1.length; i++) {
            if (str1[i] != str2[i]) {
                dist_counter += 1;
            }
        }
        return dist_counter;
        } else {
        return new Error('strings are not of equal size.');
        }
    }

    //This function stops the code 
    static async sleep(seconds) {
        return new Promise(resolve => {
            setTimeout(resolve, seconds * 1000);
        });
    }
}

module.exports = Utility;
