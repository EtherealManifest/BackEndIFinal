const express = require("express");
const router = express();
const stateController = require("../../Controller/stateController");

//router.route('/:contiguous').get(stateController.getContiguous);

//router.route('/:noncontiguous').get(stateController.getNoncontiguous);

router.route('/:code/funfact')
    .get(stateController.getAFunFact)
    .post(stateController.addAFunFact)
    .patch(stateController.patchAFunFact)
    .delete(stateController.deleteAFunFact)

router.route('/:code/capital').get(stateController.getCapital);

router.route('/:code/nickname').get(stateController.getNickname);

router.route('/:code/population').get(stateController.getPopulation);

router.route('/:code/admission').get(stateController.getAdmission);

router.route('/:code').get(stateController.getState);

router.route("/").get(stateController.getAllStates);




module.exports = router;