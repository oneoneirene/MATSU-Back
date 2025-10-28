import passport from '../passport/passport.js'
import jsonwebtoken from 'jsonwebtoken'

// 登入驗證 middleware
export const login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Login error:', err)
      return res.status(500).send({ success: false, message: err.message || '未知錯誤' })
    }
    if (!user) {
      const msg = info?.message || '帳號或密碼錯誤'
      return res.status(401).send({ success: false, message: msg })
    }
    req.user = user
    next()
  })(req, res, next)
}

// JWT 驗證 middleware
export const jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, data, info) => {
    if (err) {
      console.error('JWT error:', err)
      return res.status(500).send({ success: false, message: err.message || '未知錯誤' })
    }
    if (!data) {
      let msg
      if (info instanceof jsonwebtoken.JsonWebTokenError) {
        msg = '驗證錯誤'
      } else {
        msg = info?.message || '未授權'
      }
      return res.status(401).send({ success: false, message: msg })
    }
    req.user = data.user
    req.token = data.token
    next()
  })(req, res, next)
}
