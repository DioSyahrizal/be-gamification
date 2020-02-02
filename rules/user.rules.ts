// import bcrypt from "bcrypt";
// import { check } from "express-validator/check";
// import { User } from "../models/users";

// export const userRules = {
//   forRegister: [
//     check("email")
//       .isEmail()
//       .withMessage("Invalid email format")
//       .custom(email => User.find({ where: { email } }).then((u: any) => !!!u))
//       .withMessage("Email exists"),
//     check("password")
//       .isLength({ min: 8 })
//       .withMessage("Invalid password"),
//     check("confirmPassword")
//       .custom(
//         (confirmPassword, { req }) => req.body.password === confirmPassword
//       )
//       .withMessage("Passwords are different")
//   ],
//   forLogin: [
//     check("email")
//       .isEmail()
//       .withMessage("Invalid email format")
//       .custom(email => User.findOne({ where: { email } }).then((u: any) => !!u))
//       .withMessage("Invalid email or password"),
//     check("password")
//       .custom((password, { req }) => {
//         return User.findOne({
//           where: { email: req.body.email }
//         }).then((u: any) => bcrypt.compare(password, u!.password));
//       })
//       .withMessage("Invalid email or password")
//   ]
// };
const validation = "a";
export default validation;
