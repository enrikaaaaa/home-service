import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../consts";
import { useContext, useState } from "react";

import Button from "../../common/Button/Button";
import FormikField from "../../common/Formik/FormikInput";
import React from "react";
import { UserContext } from "../../../context/UserContext";
import { loginUser } from "../api";
import styles from "@/components/user/Form.module.scss";

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formValues: any) => {
    try {
      const response = await loginUser(formValues);
      if (response.error) {
        setError(response.message ?? "An error occurred");
      } else {
        login(response);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError((error as Error).message ?? "An error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <h2 className={styles.title}>Login</h2>
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
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Log in</Button>
          <div className={styles.link}>
            <Link to="/register" className={styles.signUp}>
              Do not have an account? Sign up
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
