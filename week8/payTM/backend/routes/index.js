import { Router } from 'express';
import userRouter from "./user.js";
import accountRouter from "./account.js";

const router = Router();

/** this from ai (im tired)
 * Root Router Setup
 *
 * 🔗 This connects route modules (`userRouter` and `accountRouter`) to the main app.
 * 
 * 🧭 Example Base URL structure in `index.js`:
 *     app.use("/api/v1", rootRouter);
 * 
 * 🔀 Resulting Routes:
 *     - /api/v1/user/signup
 *     - /api/v1/account/balance
 *
 * 📦 Keeps route files modular and organized.
 */


router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;