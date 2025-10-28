import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import users from '../models/users.js'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// -------------------- Local Strategy (Login) --------------------
passport.use('login', new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password'
}, async (account, password, done) => {
  try {
    const user = await users.findOne({ account })
    if (!user) return done(null, false, { message: '帳號不存在' })

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) return done(null, false, { message: '密碼錯誤' })

    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}))

// -------------------- JWT Strategy --------------------
passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  passReqToCallback: true,
  ignoreExpiration: true
}, async (req, payload, done) => {
  const expired = payload.exp * 1000 < Date.now()
  if (expired && req.originalUrl !== '/users/extend' && req.originalUrl !== '/users/logout') {
    return done(null, false, { message: '登入逾期' })
  }

  const token = req.headers.authorization?.split(' ')[1] || ''
  try {
    const user = await users.findById(payload._id)
    if (!user) return done(null, false, { message: '使用者不存在' })
    if (!user.tokens.includes(token)) return done(null, false, { message: '驗證錯誤' })

    return done(null, { user, token })
  } catch (err) {
    return done(err, false)
  }
}))

export default passport
