function DeleteUsingObjectKey(array, key, value) {
    const newArray = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(element[key] != value){
            newArray.push(element);
        }
    }

    return newArray;
}

export {DeleteUsingObjectKey};