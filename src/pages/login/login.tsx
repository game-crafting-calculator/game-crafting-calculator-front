import React, { useContext, useEffect, useState } from "react";
import { User, FormFieldError, FormFieldValid } from "../../types";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";

import "./login.css";
import validateEmail from "../../utils/email-validator";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../global-context";
import apiService from "../../services/api-service";
import { setToken } from "../../services/local-storage-service";

export default function Login() {
  //Navigate
  const navigate = useNavigate();

  //STATES
  const [formValues, setFormValues] = useState<User>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<any>({});

  const [user, setUser] = useContext(UserContext);

  //EFFECTS
  useEffect(() => {
    console.log("form values: ", formValues);
  }, [formValues]);

  useEffect(() => {
    console.log("form errors: ", formErrors);
  }, [formErrors]);

  //FUNCTIONS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    let newFormValues = { ...formValues };
    newFormValues[name] = value;
    setFormValues(newFormValues);
  };

  const validateForm = () => {
    if (Object.keys(formValues).length === 0) {
      return false;
    }

    let isFieldMissing;
    for (const field in formValues) {
      if (!formValues[field]) {
        let error: FormFieldError = {
          isValid: false,
          message: "field missing",
        };

        setFormErrors((curr: any) => ({
          ...curr,
          [field]: error,
        }));

        console.log(`field ${field} is missing !`);

        isFieldMissing = true;
        continue;
      }

      let valid: FormFieldValid = {
        isValid: true,
      };

      setFormErrors((curr: any) => ({
        ...curr,
        [field]: valid,
      }));
    }

    console.warn(isFieldMissing);

    let isEmailValid = validateEmail(formValues.email);
    if (!isEmailValid) {
      let invalid: FormFieldError = {
        isValid: false,
        message: "email is invalid",
      };
      setFormErrors((curr: any) => ({
        ...curr,
        email: invalid,
      }));
    }

    if (isFieldMissing || !isEmailValid) {
      return false;
    }

    console.warn("test");

    setFormErrors((errors: any) => ({}));
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let response = await apiService.user.login(formValues);
      setToken(response);
      navigate("/");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getValidity = (fieldName: string) => {
    if (!formErrors[fieldName]) {
      return undefined;
    }

    return formErrors[fieldName];
  };

  const getLabelText = (fieldName: string) => {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  const getErrorCSSClass = (fieldName: string) => {
    console.log(getValidity(fieldName));
    return getValidity(fieldName) === false ? "error" : "";
  };

  //TEMPLATE
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {["email", "password"].map((e: any) => {
          let inputTypes: any = {
            email: "text",
            password: "password",
          };
          return (
            <CustomTextInput
              type={inputTypes[e]}
              label={e}
              name={e}
              onChange={handleChange}
              isValid={getValidity(e)?.isValid}
              error={getValidity(e)?.message}
              id={e}
            />
          );
        })}
        <CustomButton text="Sign in" type="submit" theme="success" />
        <CustomButton
          text="Create an Account"
          type="button"
          onClick={() => navigate("/register")}
          theme="warn"
        />
      </form>
    </div>
  );
}
