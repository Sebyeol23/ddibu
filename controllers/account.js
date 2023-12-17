async function createUser(req, res, next){
    try{
        const result = await "good";
        res.send(result);
    } catch(e){
        next(e);
    }
}

module.exports = {
    createUser
}