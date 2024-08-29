const jwt = require('jsonwebtoken')
const crypto = require('crypto')

exports.signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

exports.createSendToken = (res, id) => {
    const token = signToken(id)
    res.cookie('jwt', token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
      });
    
}

exports.resetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex')
  const hash = crypto.createHash('sha256').update(resetToken).digest('hex')

  return {resetToken, hash}
}

exports.verifyResetToken = (req) => {
  return crypto.createHash('sha256').update(req.params.resetToken).digest('hex')
}