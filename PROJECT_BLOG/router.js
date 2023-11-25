import { Router } from "express";

import auth from "./middleware/auth.js";



import * as rh from "./request-handlers.js";



const router = Router()

router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/get-blog").get(auth,rh.getBlog);
router.route("/profile").get(auth,rh.profile);
router.route("/add-blog").post(auth,rh.addBlog);
router.route("/get-file").get(rh.getfile)

export default router;





