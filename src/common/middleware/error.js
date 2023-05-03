export default (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(422).json({
      status: "error",
      message: err.error.details[0].message,
    });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
