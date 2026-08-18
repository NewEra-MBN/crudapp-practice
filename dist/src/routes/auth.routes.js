import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import authValidation from "../validations/auth.validation.js";
import authControllers from "../controllers/auth.controllers.js";
const router = Router();
router.post('/login', validate(authValidation.login), (req, res) => {
    res.send('hey i am login');
});
router.post('/signup', validate(authValidation.register), authControllers.register);
export default router;
//# sourceMappingURL=auth.routes.js.map