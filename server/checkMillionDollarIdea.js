const checkMillionDollarIdea = (req, res, next) => {
    idea = req.body;
    ideaValue = idea.numWeeks * idea.weeklyRevenue;
    if(!(ideaValue >= 1000000)) {
        res.status(400).send("Idea is worthless!");
    } else {
        next();
    }
};






// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;