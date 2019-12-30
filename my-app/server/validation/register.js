const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  console.log("data.username: ", data.username);
  console.log("isEmpty(data.username) ", isEmpty(data.username))
  console.log("typeof(data.password): ", data.password);
  console.log("typeof(data.first_name): ", data.first_name);
  console.log("typeof(data.last_name): ", data.last_name);


  // Name checks
  console.log("data.username II: ", data.username);
  console.log("isEmpty(data.username) II", isEmpty(data.username));
  if (isEmpty(data.username)) {

    errors.username = "Username field is required";
  }
  // First name checks
  if (isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }

  // Last name checks
  if (isEmpty(data.last_name)) {
    errors.first_name = "Last name is required";
  }

  if ((data.first_name).length  < 3) {
    errors.first_name = "Password must be at least 3 characters";
  }

  if ((data.last_name).length < 3) {
    errors.last_name = "Password must be at least 3 characters";
  }

  // Password checks
  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if ((data.password).length < 3) {
    errors.password = "Password must be at least 3 characters";
  }

  console.log("errors: ", errors);

return {
    errors,
    isValid: isEmpty(errors)
  };
};
