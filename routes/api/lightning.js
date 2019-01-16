const router = require('express').Router()
const apiController = require('../../controllers/apiController')
const axios = require('axios')

router.route('/')
  .post(apiController.getCharge)

// router.route('/authenticate')
//   .get('apiController.confirmCharge')

router.route('/authenticate')
axios
.get('https://bitmemory.herokuapp.com/api/charge/authenticate')
.then(({ data: { results } }) => res.json(results))
.catch(err => res.status(422).json(err));

module.exports = router;



