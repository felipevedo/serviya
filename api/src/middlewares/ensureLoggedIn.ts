// @ts-nocheck
export const ensureLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    // 401
    res.send('Not Authorized')
  }
}