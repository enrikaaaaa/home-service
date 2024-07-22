import * as Yup from "yup";

import { errorMessage } from "../consts/errorMessage";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email(errorMessage.email).required(errorMessage.required),
  password: Yup.string().required(errorMessage.required),
});

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required(errorMessage.required),
  email: Yup.string().email(errorMessage.email).required(errorMessage.required),
  password: Yup.string().required(errorMessage.required),
});

const loginInitialValues = {
  email: "",
  password: "",
};

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
};

export {
  loginValidationSchema,
  registerValidationSchema,
  loginInitialValues,
  registerInitialValues,
};
