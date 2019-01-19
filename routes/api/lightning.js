const router = require('express').Router()
const apiController = require('../../controllers/apiController')

router.route('/')
  .post(apiController.getCharge)

router.route('/:id')
  .post(apiController.confirmCharge)

module.exports = router;



