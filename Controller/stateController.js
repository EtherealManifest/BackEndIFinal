const { nextTick } = require("process");
const State = require("../Model/state");

const getAllStates = async (req,res) =>{
    console.log(req?.query)// "states/AZ/capital" -> /:code/capital
    if(typeof req?.query?.contig != "undefined"){
        if(req?.query?.contig==='true'){
            console.log("contig is true")
            const states = await State.find().sort({"admission_number": 1}).limit(48);
            if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})}
            res.json(states);
        }
        else{
            console.log("contig is false")
            const states = await State.find().sort({"admission_number": -1}).limit(2);
            if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})}
            res.json(states);
        }
    }
    else{
        const states = await State.find();
        if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})}
        res.json(states);
    }
}
const getAFunFact = async(req,res) =>{
    if(!req.params.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    const stateTarget = await State.findOne({code: req.params.code})

    if(!stateTarget) {
        return res
        .status(204).json({message: `state code "${req.body.code}" not recognized`});
    }
    console.log(stateTarget.funfacts)
    if(typeof stateTarget.funfacts != "undefined"){
        const randomElement = stateTarget.funfacts[Math.floor(Math.random() * stateTarget.funfacts.length)];
        res.json(randomElement);
    }
    else{
        return res.status(400).json({message: "Uh... Didnt find that one. Sorry"})

    }
        
}
const getContiguous = async(req, res) =>{
    const states = await State.find().sort({"admission_number": 1}).limit(48);
    if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})}
    return(states);
}

const getCapital = async(req, res) =>{
    const states = await State.findOne({code: req.params.code});
    if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})};
    console.log(states.capital_city, states.capital_url)
    res.status(200).json({"state" : states.state, "capital" : states.capital_city});
}

const getNickname = async(req, res) =>{
    const states = await State.findOne({code: req.params.code});
    if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})};
    console.log(states.capital_city, states.capital_url)
    res.status(200).json({"state" : states.state, "nickname" : states.nickname});
}

const getPopulation = async(req, res) =>{
    const states = await State.findOne({code: req.params.code});
    if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})};
    console.log(states.capital_city, states.capital_url)
    res.status(200).json({"state" : states.state, "population" : states.population});
}

const getAdmission = async(req, res) =>{
    const states = await State.findOne({code: req.params.code});
    if(!states){return res.status(400).json({message: "Oopsie Poopsie! Didn't work!"})};
    console.log(states.capital_city, states.capital_url)
    res.status(200).json({"state" : states.state, "admission" : states.admission_date});
}


//find one state based on the state code, must have the two-letter state code, in the URL
const getState = async (req, res) =>{
    if(!req.params.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    const stateTarget = await State.findOne({code: req.params.code})

    if(!stateTarget) {
        return res
        .status(204).json({message: `state code "${req.params.code}" not recognized`});
    }
    res.json(stateTarget);
};

//add a fun fact, body need to contain the 2-letter state code and a fun fact to add
const addAFunFact = async (req, res) =>{
    if(!req.params.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    if(!req.body.funFact){
        return res.status(400).json({message: "buddy, theres not a fun fact here. I cant do my job if you dont give me all the details, I cant really help you dude.?"})


    }
    const stateTarget = await State.findOne({code: req.params.code}).exec();

    if(!stateTarget) {
        return res
        .status(400).json({message: `state code "${req.body.code}" not found`});
    }

    stateTarget.funfacts[stateTarget.funfacts.length] = req.body.funFact;
    
    const result =  stateTarget.save()

    res.json(stateTarget)
};

const patchAFunFact = async (req,res) => {
    if(!req.params.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    if(!req.body.funFact){
        return res.status(400).json({message: "buddy, theres not a fun fact here. I cant do my job if you dont give me all the details, I cant really help you dude.?"})

    }
    if(!req.body.target){
        return res.status(400).json({message: "buddy, theres not a target index to change here. I cant do my job if you dont give me all the details, I cant really help you dude.?"})

    }
    const stateTarget = await State.findOne({code: req.params.code}).exec();

    if(!stateTarget) {
        return res
        .status(400).json({message: `state code "${req.body.code}" not found`});
    }

    stateTarget.funfacts[req.body.target-1] = req.body.funFact;
    
    const result =  stateTarget.save()

    res.json(stateTarget)
}

const deleteAFunFact = async (req,res) => {
    if(!req.params.code){
        return res.status(400).json({message: "State Code is required, please add in the form of two letters."})
    }
    if(!req.body.funFact){
        return res.status(400).json({message: "buddy, theres not a fun fact here. I cant do my job if you dont give me all the details, I cant really help you dude.?"})

    }
    if(!req.body.target){
        return res.status(400).json({message: "buddy, theres not a target index to change here. I cant do my job if you dont give me all the details, I cant really help you dude.?"})

    }
    const stateTarget = await State.findOne({code: req.params.code}).exec();

    if(!stateTarget) {
        return res
        .status(400).json({message: `state code "${req.body.code}" not found`});
    }

    stateTarget.funfacts.pop();
    
    const result =  stateTarget.save()

    res.json(stateTarget)
}
module.exports = { 
    getAllStates, 
    getState, 
    addAFunFact, 
    getContiguous, 
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    getAFunFact,
    patchAFunFact,
    deleteAFunFact};