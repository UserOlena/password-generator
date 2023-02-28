let passwordInput = document.getElementById('password-input'); // variable to reference DOM element with ID pasword-input
passwordInput.value = ''; // value of DOM element with ID pasword-input
const possibleChars = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "1234567890", "#$%&'()*+,-./:;<=>?@[\]^_`{|}"]; // an array containing all possible characters to generate a password from.
let numCharacter = ''; // password length response will be stored here. 
let userChoice = []; // array to store user's choice
let generatedPassword = ''; // the variable will store a version of the password that is not the final version.

// when user clicks Generate button this function is being invoked 
const genPasswordRequest = () => {
    passwordInput.value = ''; // to reassign the value of passwordInput in case user doesn't update the page and clicks on Generate btn again.
    userChoice = []; // to overwrite the value of the user's choice if they click the Generate button multiple times without refreshing the page.
    generatedPassword = ''; // to overwrite the previously chosen value if the user generates a password multiple times without refreshing the page, as the variable would otherwise retain the previous value.

    // initially, we prompt the user for the desired length of their password by calling the function passwordLengthPrompt().
    const passwordLengthResult = passwordLengthPrompt();
    
    // If the passwordLengthPrompt() function returns a true value, indicating that the user has provided a valid password length,
    // we can then call the userChoiceConfirm() function to determine the types of characters the user wishes to include in their password.
    
    // the value of passwordLengthResult will be true if the user selects a password length between 8 and 128 that includes numerical characters, and false if they select any other options.
    if (passwordLengthResult) { // While we could use the ternary operator to achieve the same functionality as the original code, it does not allow the inclusion of the return keyword.
        userChoiceConfirm(); //This is problematic in this case, as the return keyword is necessary to halt the execution of the code if the passwordLengthResult is false.
    } else {
        return false; 
    }
    
    // To validate if the user has chosen at least one type of possible characters, we need to check if the userChoice variable contains any characters.
    // To handle the scenario where the user has clicked 'cancel' on all of the prompts,
    // it is necessary to ensure that the userChoice array is empty and that generatePassword() is not called.
    // If so, we'll alert user that they need to chose at least 1 type of chars.
    if (userChoice.length === 0) {
        alert('Please choose at least one type of characters!');
        return false
    } else {
        // user has chosen at least one type of character
        generatePassword();
    }

    // After generating the password, it is necessary to shuffle its characters.
    // This is because generatePassword() guarantees that at least one character of each chosen character type is included in the password,
    // but the order of this characters are always the same(1st char - lowCase, 2nd - UppCase, 3rd - number, 4th - specChar).
    // Shuffling the characters by calling shuffle() ensures that the password is more secure and less predictable.
    if (generatedPassword) {
        let generatedPasswordToArray = generatedPassword.split('');
        shuffle(generatedPasswordToArray);
        let userFinalPassword = generatedPasswordToArray.join('');
        passwordInput.value = userFinalPassword; // final password is send to the text area
    } else {
        alert('Password has not been generated :(')
    }
}

// function promts user for password length and validates that the value is numerical value in the range betweet 8 and 128.
const passwordLengthPrompt = () => {
    numCharacter = prompt('How many characters long do you want your password to be? Please enter numeric value within a range of 8 to 128 characters in length');
        if (isNaN(numCharacter) || numCharacter < 8 || numCharacter > 128) {
            alert('Please enter numeric value within a range of 8 to 128 characters in length and try again.');
            return false;
        } else {
            return true;
        }
    }    

// asks user what type of chars they would like to include in their password
const userChoiceConfirm = () => {
    if (confirm('Would you like to include LOWERCASE LETTERS in your password?')) {
        userChoice = userChoice.concat(possibleChars[0]);
    }
    
    if (confirm('Would you like to include UPPERCASE LETTERS in your password?')) {
        userChoice = userChoice.concat(possibleChars[1]);
    }
    
    if (confirm('Would you like to include NUMERIC VALUE in your password?')) {
        userChoice = userChoice.concat(possibleChars[2]);
    }
    
    if (confirm('Would you like to include SPECIAL CHARACTERS in your password?')) {
        userChoice = userChoice.concat(possibleChars[3]);
    }
}

// The password generator utilizes a logic that ensures at least one character from each character type selected by the user is incorporated in the password.
// This approach is necessary due to the likelihood of Math.random not selecting special characters or numerical values,
// particularly when generating shorter passwords of approximately 8 characters where there are only 10 numerical values available out of a total of 90 characters.
const generatePassword = () => {
    let lowCaseLet = 1;
    let upCaseLet = 1;
    let num = 1;
    let specChars = 1;

    do {
        if (userChoice[0]) {
            let randomIndex0 = Math.floor(Math.random() * (userChoice[0].length));
            generatedPassword += userChoice[0][randomIndex0];
        }
        lowCaseLet--
        do {
            if (userChoice[1]) {
                let randomIndex1 = Math.floor(Math.random() * userChoice[1].length);
                generatedPassword += userChoice[1][randomIndex1];
            }
            upCaseLet--
            do { 
                if(userChoice[2]) {
                    let randomIndex2 = Math.floor(Math.random() * userChoice[2].length);
                    generatedPassword += userChoice[2][randomIndex2];
                }
                num--
                do {
                    if (userChoice[3]) {
                        let randomIndex3 = Math.floor(Math.random() * userChoice[3].length);
                        generatedPassword += userChoice[3][randomIndex3];
                    }
                    specChars--  
                } while (specChars === 1);
            } while (num === 1);
        } while(upCaseLet === 1);
    } while(lowCaseLet === 1);

    let numCharacterRemaining = numCharacter - generatedPassword.length;
    let userChoiceToString = userChoice.toString();

    for (let i = 0; i < numCharacterRemaining; i++) {
        let randomIndex = Math.floor(Math.random() * userChoiceToString.length);
        generatedPassword += userChoiceToString[randomIndex];
    }
    return generatedPassword;
}

// By invoking the shuffle() function to shuffle the characters, the password becomes more secure and less predictable,
// which is particularly important given the logic implemented in generatePassword().
const shuffle = (values) => {
    let index = values.length;
    let randomIndex = 0;
    
    while (index != 0) {
        randomIndex = Math.floor(Math.random() * index);
        index--;
        [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
    return values;
}

// Enabling a copy button to copy the value of the text area to the clipboard.
const copyPassword = () => {
    passwordInput.select();
    navigator.clipboard.writeText(passwordInput.value)
}
    
    