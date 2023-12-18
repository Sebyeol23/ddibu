function getUser(req, res){
    res.send(req.decoded);
}

module.exports = {
    getUser
}