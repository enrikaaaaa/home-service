import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  registerInitialValues,
  registerValidationSchema,
} from "../consts";

import Button from "../../common/Button/Button";
import FormikField from "../../common/Formik/FormikInput";
import { ROUTES } from "../../../routes/consts";
import React from "react";
import styles from "@/components/user/Form.module.scss";
import { useRegisterUser } from "../hooks";
import { useSnackbar } from "notistack";

const RegisterForm = () => {
  const { mutateAsync: registerUser } = useRegisterUser();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: any) => {
    try {
      await registerUser(formValues);
      navigate(ROUTES.LOGIN);
      enqueueSnackbar("Registration successful", {
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage: any = error;
      console.log(errorMessage);
      enqueueSnackbar(errorMessage?.response?.data.message ?? "", {
        variant: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={registerInitialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <h2 className={styles.title}>Register</h2>
          <div className={styles.field}>
            <FormikField name="name" placeholder="Name" />
          </div>
          <div className={styles.field}>
            <FormikField name="email" type="email" placeholder="Email" />
          </div>
          <div className={styles.field}>
            <FormikField
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <Button type="submit">Register</Button>
          <div className={styles.link}>
            <Link to={ROUTES.LOGIN} className={styles.signUp}>
              Already have an account? Log in
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
