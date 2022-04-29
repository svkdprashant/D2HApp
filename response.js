const error = (error_message) => {
    console.log(error_message);
}

const success = (message) => {
    console.log(message);
}

module.exports = {
    error: error,
    success: success
}