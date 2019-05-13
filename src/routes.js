const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

/* USER */
routes.post('/users', controllers.UserController.store)
/* END USER */

/* SESSION */
routes.post('/sessions', controllers.SessionController.store)
/* END SESSION */

routes.use(authMiddleware)

/* CRUD Ads */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)
/* END CRUD Ads */

/* PURCHASE  */
routes.post('/purchase', controllers.PurchaseController.store)

module.exports = routes
