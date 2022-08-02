const { Router } = require("express");
const User = require("../Model/user.model");
const controller = require("../controllers/controller.auth");
const { isAuthenticated } = require("../middlewares/helpers");



const router = Router();

router.route('/')
  .get(controller.getHome);

// signUp routes
router.route('/login')
  .get(controller.login_get)
  .post(controller.login_post);


router.route('/create/account')
  .get(controller.signup_get)
  .post(controller.signup_post);

router.get('/recipe',isAuthenticated,controller.getRecipe);

router.get("/logout",controller.getLogout);



module.exports = router;
