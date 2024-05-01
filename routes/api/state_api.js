const express = require("express");
const router = express();
const stateController = require("../../Controller/stateController");

router.get('/:contig=true', ()=>{
    console.log("contiguous found");
});
router.route('/:code').get(stateController.getState);

router.route("/").get(stateController.getAllStates);



module.exports = router;