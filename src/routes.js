const express = require('express')
const validate = require('express-validation')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

/* USER */
routes.post('/users', validate(validators.User), controllers.UserController.store)
/* END USER */

/* SESSION */
routes.post('/sessions', validate(validators.Session), controllers.SessionController.store)
/* END SESSION */

routes.use(authMiddleware)

/* CRUD Ads */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)
/* END CRUD Ads */

/* PURCHASE  */
routes.post('/purchase', validate(validators.Purchase), controllers.PurchaseController.store)

module.exports = routes
