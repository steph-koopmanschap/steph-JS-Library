
//A new data type for your javascript
//The Time data type
//Unlike the native Date() object this data type allows you to perform math on time.
//It is also more simplified as it only focuses on time and not entire Dates

//Hours are limitless
//Minutes are never above 59
//Seconds are never above 59
class Time {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    //Add 2 times together. 
    //Returns a new Time object
    add(time2) {
        return new Time();
    }
    //Subtract 2 times 
    //Returns a new Time object
    sub(time2) {
        return new Time();
    }

    mul(time2) {
        return new Time();
    }

    div(time2) {
        return new Time();
    }

    //Convert an entire time object to seconds (for easier calculation)
    //Returns a single value
    timeToSeconds() {
        let seconds = this.seconds;
        seconds += Time.HoursToSeconds(this.hours);
        seconds += Time.mintuesToSeconds(this.minutes);
        return seconds;
    }

    //Returns the Time data as a string
    //FORMAT: HH:MM:SS
    printTime() {
        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }

    //Converts the value to a Time object
    //Returns new Time
    //Types:
    //SECONDS - Convert seconds
    //MINUTES - Convert minutes
    //HOURS - Convert hours
    static toTime(value, type="SECONDS") {
        switch (type) {
            case "SECONDS":
                return new Time();
            case "MINUTES":
                return new Time();
            case "HOURS":
                return new Time();
            default: 
                throw new Error(`Type ${type} is not recognized. You can only choose from SECONDS, MINUTES, or HOURS`);
        }
    }

    static secondsToMinutes(seconds) {
        return seconds / 60;
    }

    static minutesToHours(minutes) {
        return minutues / 60;
    }

    static hoursToMinutes(hours) {
        return hours * 60;
    }

    static mintuesToSeconds(minutes) {
        return minutues * 60;
    }

    static secondsToHours(seconds) {
        return hours / 3600;
    }

    static HoursToSeconds(hours) {
        return hours * 3600;
    }
}

module.exports = Time;
