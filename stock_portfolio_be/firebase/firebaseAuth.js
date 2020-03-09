const firebaseAdmin = require("./firebase.js");

const checkFirebase = (req, res, next) => {
  console.log(req.body);
  const { token } = req.query;
  if (token) {
    console.log("HIT token IF");
    checkFirebaseTokenParams(req, res, next);
  } else {
    console.log("HIT TOKEN ELSE");
    checkFirebaseToken(req, res, next);
  }
};

const checkFirebaseToken = (req, res, next) => {
  const { token } = req.body;
  if (token === process.env.FIREBASE_TESTING) {
    res.locals.uid = "TESTING";
    next();
  } else {
    firebaseAdmin.defaultAdmin
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        const uid = decodedToken.uid;
        res.locals.uid = uid;
        next();
      })
      .catch(err => {
        res.json({
          err
        });
      });
  }
};

const checkFirebaseTokenParams = (req, res, next) => {
  const { token } = req.query;
  if (token === process.env.FIREBASE_TESTING) {
    res.locals.uid = "TESTING";
    next();
  } else {
    console.log("authenticating user");
    firebaseAdmin.defaultAdmin
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        const uid = decodedToken.uid;
        res.locals.uid = uid;
        console.log("authenticating user complete");
        next();
      })
      .catch(err => {
        res.json({
          err
        });
      });
  }
};

module.exports = {
  checkFirebase
};
