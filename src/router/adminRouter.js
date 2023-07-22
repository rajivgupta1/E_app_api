import express from "express";
import { hashPassword } from "../helper/bcrypt.js";
import { insertAdmin } from "../model/admin/AdminModel.js";
import { newAdminValidation } from "../middleware/joiValidation.js";
import { accountVerificationEmail } from "../helper/nodemailer.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// create new admin api
router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //TODO create code and add with req.body
    req.body.verificationCode = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const result = await insertAdmin(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your acount",
      });

      const link = ` ${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;

      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to add new admin, Please try agian later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message =
        "This email is already used by another Admin, Use different email or reset your password";
    }

    next(error);
  }
});

export default router;