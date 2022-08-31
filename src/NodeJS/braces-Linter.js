
class Linter {
    constructor() {
        this.stack = [];
    }

    lint(text) {
        //Loop over the text
        for (let charIndex = 0; charIndex < text.length; charIndex++) {
            const char = text[charIndex];
            console.log("character: " + char);
            console.log("index: " + charIndex);
            console.log("stack: " + this.stack);

            //If the character is an opening brace push it into the stack
            if(this.#isOpeningBrace(char)) {
                this.stack.push(char);
            }
            else if (this.#isClosingBrace(char)) {
                //If the current character is a closing brace.
                //Check if it matches the most recent closing brace
                //If yes. remove last item from the stack
                if (this.#matching_close_most_recent_brace(char)) {
                    this.stack.pop();
                }
                //If the current character is a closing brace,
                //but does not match or 'close' the opening brace
                //then give error
                else {
                    return `Error: Incorrect closing brace ${char} at index: ${charIndex}`;
                }  
            } 
        }
        //If there is still an item in the stack
        //Then there is an opening brace without a closing brace
        if (this.stack.length >= 1) {
            return `Error: ${this.stack[this.stack.length - 1]} does not have a closing brace`;
        }
        else {
            return "No errors found";
        }
    }

    #isOpeningBrace(char) {
        return ['(', '[', '{'].includes(char);
    }

    #isClosingBrace(char) {
        return [')', ']', '}'].includes(char);
    }

    #which_opening_brace_matches_closing_brace(char) {
        switch (char) {
            case ')':
                console.log("(");
                return '(';
            case ']':
                console.log("[");
                return '[';
            case '}':
                console.log("{");
                return '{';
        }
    }

    //Return last item in the stack
    #mostRecent_OpeningBrace() {
        console.log(`Most recent opening brace: ${this.stack[this.stack.length - 1]}`);
        return this.stack[this.stack.length - 1];
    }

    //Check if the las
    #matching_close_most_recent_brace(char) {
        //console.log((this.#which_opening_brace_matches_closing_brace(char) === this.#mostRecent_OpeningBrace()));
        return (this.#which_opening_brace_matches_closing_brace(char) === this.#mostRecent_OpeningBrace());
    }

}
