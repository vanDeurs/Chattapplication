const isRealString = (string) => {
    return typeof string === 'string' && string.trim().length > 0;
};

const isOriginal = (input, array) => {
    for (let i in array) {
        if (input.toLowerCase() === array[i].toLowerCase()) {
            console.log(`Match: ${input} and ${array[i]}`);
            return false;
        }
        console.log(`No match: ${input} and ${array[i]}`);
    }
    return true;
}

const removeDuplicates = (originalArray, prop) => {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}




module.exports = {
    isRealString,
    isOriginal,
    removeDuplicates
}