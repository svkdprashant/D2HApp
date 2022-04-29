const validateUserBalance = (value) => {
    return /^[0-9]+\.?[0-9]+$/.test(value);
}

const validateChannelName = (value) => {
    return /^[a-zA-Z0-9\s]+$/.test(value);
}

module.exports = {
    validateUserBalance: validateUserBalance,
    validateChannelName: validateChannelName
}