import { ErrorMessage, Field } from "formik";

import Input from "../Input/Input";
import React from "react";
import styles from "@/components/common/Input/Input.module.scss";

interface FormikFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
}

const FormikField = ({ name, ...props }: FormikFieldProps) => {
  return (
    <div>
      <Field name={name} as={Input} {...props} />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default FormikField;
