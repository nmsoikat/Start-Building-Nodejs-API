const router = require('express').Router()
const { UserService } = require("../../services")
const { APISuccessResponse } = require("../../utils")
const protect = require('../middlewares/protect');
const catchAsync = require('../../utils/catch-async');

router
  .route('/')
  .get(
    protect,
    catchAsync(async (req, res, next) => {
      const users = await UserService.getAllUser(req)

      APISuccessResponse(res, users)
    })
  )


module.exports = router;