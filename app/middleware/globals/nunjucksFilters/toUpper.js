module.exports = (string) => {
    if(string === null || string === undefined || typeof string !== 'string') {
        return;
    }
    return string.toUpperCase();
};
