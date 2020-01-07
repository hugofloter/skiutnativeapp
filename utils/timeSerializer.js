export const getDate = (date) => {

    let inputDate = new Date(date.replace('-','/'));

    let todaysDate = new Date();

    if ( todaysDate.getDate() - inputDate.getDate() === 0 ) {
        return `Aujourd'hui à ${inputDate.getHours()}:${inputDate.getMinutes()}`;
    }

    return`Il y a ${Math.abs(todaysDate.getDate() - inputDate.getDate())} jours`
}