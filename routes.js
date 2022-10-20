const { fork } = require("child_process");

function getRoot(req, res) {
  res.render("index", {});
}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    if (!req.session["login"]) {
      req.session["login"] = {};
      req.session["login"].username = username;
    }
    res.render("pages/vistaProductos.ejs", { user });
  } else {
    res.render("pages/login.ejs");
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/vistaProductos.ejs", { user });
  } else {
    res.render("pages/register.ejs");
  }
}

function postLogin(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/vistaProductos.ejs", { user });
}

function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/vistaProductos.ejs", { user });
}

function getFaillogin(req, res) {
  res.render("pages/login-error", {});
}

function getFailsignup(req, res) {
  res.render("pages/signup-error", {});
}

function getLogout(req, res) {
  if (req.isAuthenticated()) {
    const { username } = req.user;
    req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          return res.json({ status: "Logout ERROR", body: err });
        }
        res.render("pages/logout.ejs", { username });
      });
    });
  }
}

function failRoute(req, res) {
  res.status(404).render("pages/routing-error", {});
}

function getInfoProcess(req, res) {
  info = {
    args: process.argv,
    cwd: process.cwd(),
    pid: process.pid,
    version: process.version,
    title: process.title,
    os: process.platform,
    memoryUsage: process.memoryUsage().rss,
  };
  res.render("pages/infoProcess.ejs", { info });
}

function getInfoProcess(req, res) {
  info = {
    args: process.argv,
    cwd: process.cwd(),
    pid: process.pid,
    version: process.version,
    title: process.title,
    os: process.platform,
    memoryUsage: process.memoryUsage().rss,
  };
  res.render("pages/infoProcess.ejs", { info });
}

function getRandoms(req, res) {
  const { cant = 100000000 } = req.query;
  const computo = fork("./computo.js");
  computo.send(cant);
  computo.on("message", (result) => {
    res.render("pages/infoRandoms.ejs", {
      numbers: Object.keys(result),
      values: Object.values(result),
    });
  });
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  failRoute,
  getInfoProcess,
  getRandoms,
};
