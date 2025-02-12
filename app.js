// This file is for handling app
import Storage from "./Storage.js";

const Account = {
  setStatus: (field, message, status) => {
    let errorMessage = field.parentElement.querySelector(".error-message");
    if (status == "success") {
      errorMessage &= errorMessage.innerText = "";
      field.classList.remove("ring-red-600");
    }
    if (status == "error") {
      errorMessage.innerText = message;
      field.classList.add("ring-red-600");
    }
  },
  setSuccess: (field) => {
    Account.setStatus(field, null, "success");
    return true;
  },
  setError: (field, errorMsg) => {
    Account.setStatus(field, `${errorMsg}`, "error");
    return false;
  },
  validateFieldsOnSignup: (field) => {
    if (field.value.trim() === "") {
      return Account.setError(field, "cannot be blank.");
    } else {
      if (field.type == "password") {
        if (field.value.length < 10) {
          return Account.setError(field, "must be at least 10 characters.");
        } else {
          return Account.setSuccess(field);
        }
      } else {
        return Account.setSuccess(field);
      }
    }
  },
  validateFieldsOnSignin: (field) => {
    if (field.value.trim() === "") {
      return Account.setError(field, "cannot be blank.");
    } else {
      return Account.setSuccess(field);
    }
  },
  validateUser: (fields) => {
    const users = Storage.getItem("users");
    let isUserValid;
    let fieldsValue = { email: "", password: "" };
    [...fields].forEach((field) => {
      const input = document.querySelector(`#${field}`);
      fieldsValue = { ...fieldsValue, [input.type]: input.value };
    });
    if (users.length !== 0) {
      isUserValid = [...users].some((user) => {
        return (
          user.email === fieldsValue.email &&
          user.password === fieldsValue.password
        );
      });
      if (!isUserValid) {
        const lastField = document.querySelector(
          `#${fields[fields.length - 1]}`
        );
        return Account.setError(lastField, "Incorrect email or password.");
      }
    } else {
      const lastField = document.querySelector(`#${fields[fields.length - 1]}`);
      return Account.setError(lastField, "There are no registered users.");
    }
  },
  validateOnSignin: (form, fields) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = 0;
      let fieldsValue;
      [...fields].forEach((field) => {
        const input = document.querySelector(`#${field}`);
        fieldsValue = { ...fieldsValue, [input.type]: input.value };
        if (Account.validateFieldsOnSignin(input) == false) {
          error++;
        }
      });
      if (error == 0 && Account.validateUser(fields) !== false) {
        localStorage.setItem("auth", 1);
        window.history.replaceState("home.html", null, "home.html");
        window.location.href = "./home.html";
      }
    });
  },
  validateFieldsOnFocus: (form) => {
    form.addEventListener("click", (e) => {
      if (e.target.matches(".input")) {
        let errorMessage =
          e.target.parentElement.querySelector(".error-message");
        e.target.classList.remove("ring-red-600");
        errorMessage.innerText = "";
      }
    });
  },
  validateIsUserExist: (input) => {
    if (input.type == "email") {
      const users = Storage.getItem("users");
      const userIsExist = [...users].some((user) => {
        return user.email == input.value;
      });
      if (userIsExist) {
        return Account.setError(input, "This account already exists.");
      }
    }
  },
  //
  validateOnSignup: (form, fields) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = 0;
      let fieldsValue = { email: "", password: "" };
      [...fields].forEach((field) => {
        const input = document.querySelector(`#${field}`);
        fieldsValue = { ...fieldsValue, [input.type]: input.value };
        if (
          Account.validateFieldsOnSignup(input) == false ||
          Account.validateIsUserExist(input) == false
        ) {
          error++;
        }
      });
      if (error == 0) {
        const userId = Storage.getItem("users").length;
        const newUser = { id: userId, ...fieldsValue };
        Storage.create("users", newUser);
        window.location.href = "./";
      }
    });
  },
};

const signupForm = document.querySelector("#signup");
if (signupForm) {
  const fields = ["email", "password"];
  Account.validateOnSignup(signupForm, fields);
  Account.validateFieldsOnFocus(signupForm);
}
const signinForm = document.querySelector("#signin");
if (signinForm) {
  const fields = ["email", "password"];
  Account.validateOnSignin(signinForm, fields);
  Account.validateFieldsOnFocus(signinForm);
}
