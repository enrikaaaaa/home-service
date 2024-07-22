import apiClient from "./apiClient";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginUser = (formValues: LoginFormValues): Promise<any> =>
  apiClient.post("/auth/login", formValues).then((response) => response.data);

export const registerUser = (formValues: LoginFormValues) =>
  apiClient
    .post("/auth/register", formValues)
    .then((response) => response.data);
