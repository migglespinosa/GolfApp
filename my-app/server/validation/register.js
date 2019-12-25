const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.name) ? data.name : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // First name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }

  // Last name checks
  if (Validator.isEmpty(data.last_name)) {
    errors.first_name = "Last name is required";
  }

  if (!Validator.isLength(data.first_name, { min: 3, max: 30 })) {
    errors.first_name = "Password must be at least 3 characters";
  }

  if (!Validator.isLength(data.last_name, { min: 3, max: 30 })) {
    errors.last_name = "Password must be at least 3 characters";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password = "Password must be at least 3 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
