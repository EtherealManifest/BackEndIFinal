const State = require("../Model/state");

const getAllStates = async (req,res) =>{
    console.log(req.params)
    const states = await State.find();
    if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})}
    res.json(states)
};

//find one state based on the state code, must have the two-letter state code, in the URL
const getState = async (req, res) =>{
    console.log(req.params)
    if(!req.params.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    const stateTarget = await State.findOne({code: req.params.code})

    if(!stateTarget) {
        return res
        .status(204).json({message: `state code "${req.body.code}" not recognized`});
    }
    res.json(stateTarget);
};

//add a fun fact, body need to contain the 2-letter state code and a fun fact to add
const addFunFact = async (req, res) =>{
    if(!req.body.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    const stateTarget = await State.findOne({_code: req.body.code})

    if(!stateTarget) {
        return res
        .status(400).json({message: `state code "${req.body.code}" not found`});
    }

    stateTarget.funFact = req.body.funFact;

    const result = await stateTarget.save()

    res.json(result)
};

module.exports = { getAllStates, getState, addFunFact};