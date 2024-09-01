const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;

const validateEmail = (email) => {
  if (!email) {
    return {
      status: false,
      msg: "Това поле е задължително",
    };
  } else {
    return emailRegex.test(email)
      ? { status: true, msg: "" }
      : {
          status: false,
          msg: "Моля, въведете валиден имейл",
        };
  }
};

const validatePassword = (pass, isConfrimPass, password) => {
  if (!pass) {
    return {
      status: false,
      msg: "Моля, въведете парола",
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: "Паролата трябва да съдържа 8-40 знака, 1 главна буква (A-Z), 1 малка буква (a-z), 1 цифра (0-9)",
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password != pass) {
        return {
          status: false,
          msg: "Паролата не съвпада.",
        };
      }
      return { status: true, msg: "" };
    } else {
      return {
        status: false,
        msg: "Паролата трябва да съдържа 8-40 знака, 1 главна буква (A-Z), 1 малка буква (a-z), 1 цифра (0-9).",
      };
    }
  }
};

export { validateEmail, validatePassword };
