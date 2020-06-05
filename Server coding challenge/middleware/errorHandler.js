function errorHandler(req, res) {
    console.log(req.statusMessage);
    return res.status(req.errCode).end()
}

module.exports = errorHandler;