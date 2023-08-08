export const removeInputSpace = (input) => {
    let value;
    if(input !== null) {
        value = input.replace(/\s/g, '')
    } else {
        return null
    }
    return value
}
