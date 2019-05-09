const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    requrie: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// utilizando hooks para criptografar a senha / 'pre' significa que será antes de salvar ou atualizar
UserSchema.pre('save', async function (next) {
  // se não houve modificação na senha então pule a etapa
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})
// comparando a senha criptografada - esse é um metodo do objeto
UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}
// gerando o token de autenticação do usuário através de método statico
UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
