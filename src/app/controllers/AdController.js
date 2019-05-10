const Ad = require('../models/Ad')

class AdController {
  async index(req, res) {
    const ads = await Ad.find()

    return res.json(ads)
  }
  async show(req, res) {
    const ad = await Ad.findById(req.params.id)
    return res.json(ad)
  }
  async store(req, res) {

  }
  async update(req, res) {

  }
  async destroy(req, res) {

  }
}
module.exports = new AdController()
