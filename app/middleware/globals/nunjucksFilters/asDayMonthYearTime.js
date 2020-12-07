module.exports = (date) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if(date === null || date === undefined) {
        return;
    }
    if(typeof date === 'string') {
        date = new Date(date);
    }
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let formedDate = `${hours}:${minutes}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    return formedDate;
};
