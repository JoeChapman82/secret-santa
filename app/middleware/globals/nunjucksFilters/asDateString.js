module.exports = (date) => {
    if(date === null || date === undefined) {
        return;
    }
    date = new Date(date);
    let formedDate = `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()}`;
    return formedDate;
};
