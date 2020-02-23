const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  else if((data.username).length < 3){
    errors.username = "Username must be at least 3 characters";
  }


  // First name checks
  if (isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }

  // Last name checks
  if (isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }

  // Password checks
  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  else if((data.password).length < 3){
    errors.password = "Password must be at least 3 characters";
  }

  console.log("errors: ", errors);

return {
    errors,
    isValid: isEmpty(errors)
  };
};
