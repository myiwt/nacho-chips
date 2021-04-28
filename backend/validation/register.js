const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to empty string so that we cna use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordValidation = !isEmpty(data.passwordValidation) ? 
  data.passwordValidation : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please type in a password";
  }

  if (Validator.isEmpty(data.passwordValidation)) {
    errors.passwordValidation = "Please type in your password again";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 characters long";
  }

  if (!Validator.equals(data.password, data.passwordValidation)) {
    errors.passwordValidation = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
