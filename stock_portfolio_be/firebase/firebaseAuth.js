const firebaseAdmin = require("./firebase.js");

const checkFirebase = (req, res, next) => {
  const { token } = req.query;
  if (token) {
    checkFirebaseTokenParams(req, res, next);
  } else {
    checkFirebaseToken(req, res, next);
  }
};

const checkFirebaseToken = (req, res, next) => {
  const { token } = req.body;
  firebaseAdmin.defaultAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      res.locals.uid = uid;
      next();
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
};

const checkFirebaseTokenParams = (req, res, next) => {
  const { token } = req.query;
  firebaseAdmin.defaultAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      res.locals.uid = uid;
      next();
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
};

module.exports = {
  checkFirebase,
};
