export const getDate = (date) => {
    if (date === null) {
        return null
    }
    let inputDate = new Date(date.replace('-','/'));

    let todaysDate = new Date();

    if ( todaysDate.getDate() - inputDate.getDate() === 0 ) {
        return `Aujourd'hui à ${inputDate.getHours()}:${inputDate.getMinutes()}`;
    }

    return`Il y a ${Math.abs(todaysDate.getDate() - inputDate.getDate())} jours`
};

export const beerCallValid = (date) => {
    if (date === null) {
        return true
    }
    let inputDate = new Date(date.replace('-','/'));
    let todaysDate = new Date();

    const minutesToday = todaysDate.getHours() * 3600 + todaysDate.getMinutes();
    const minutesBeerCall = inputDate.getHours() * 3600 + inputDate.getMinutes();

    return !((todaysDate.getDate() - inputDate.getDate() === 0)
        && ((minutesToday - minutesBeerCall) < 60))
};