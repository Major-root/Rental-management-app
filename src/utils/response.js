exports.unauthorized = (res, message, data = undefined) => {
  return res.status(401).json({
    status: false,
    message: message || "Unauthorized",
    data,
  });
};

exports.forbidden = (res, message, data = undefined) => {
  return res.status(403).json({
    status: false,
    message: message || "Forbidden",
    data,
  });
};

exports.success = (res, message, data = undefined, code = 200) => {
  return res.status(code).json({
    status: true,
    message,
    data,
  });
};

exports.setCookie = (res, req, token) => {
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
};
