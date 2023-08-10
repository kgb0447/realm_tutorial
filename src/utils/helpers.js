export const getDateToString = () => {
    return Date.now().toString();
}

export const getParsedDate = (date) => {
    const storedDate = new Date(date);
    return storedDate.toString();
}

export const addSpaceBetweenCaps = (text) => {
    return text.replace(/([A-Z])/g, ' $1').trim()
}