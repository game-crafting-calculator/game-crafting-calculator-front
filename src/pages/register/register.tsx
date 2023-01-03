import React, { useContext, useEffect, useState } from "react";
import { User, FormFieldError, FormFieldValid } from "../../types";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";

import "./register.css";
import validateEmail from "../../utils/email-validator";
import { UserContext } from "../../global-context";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../services/local-storage-service";
import apiService from "../../services/api-service";

export default function Register() {
  //navigate
  const navigate = useNavigate();

  //STATES
  const [formValues, setFormValues] = useState<User>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    let doesPasswordMatch = true;

    let { password, confirmPassword } = formValues;
    if (password !== confirmPassword) {
      let error: FormFieldError = {
        isValid: false,
        message: "password does not match",
      };

      setFormErrors((curr: any) => ({
        ...curr,
        password: error,
        confirmPassword: error,
      }));

      doesPasswordMatch = false;
    }

    console.warn(isFieldMissing, doesPasswordMatch);

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

    if (isFieldMissing || !doesPasswordMatch || !isEmailValid) {
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
      let response = await apiService.user.register(formValues);
      navigate("/login");

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
    if (fieldName === "confirmPassword") {
      return "Confirm password";
    }

    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  const getErrorCSSClass = (fieldName: string) => {
    console.log(getValidity(fieldName));
    return getValidity(fieldName) === false ? "error" : "";
  };

  //TEMPLATE
  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {["username", "email", "password", "confirmPassword"].map((e: any) => {
          let inputTypes: any = {
            username: "text",
            email: "text",
            password: "password",
            confirmPassword: "password",
          };

          return (
            <CustomTextInput
              type={inputTypes[e]}
              // placeholder={e}
              name={e}
              onChange={handleChange}
              label={e === "confirmPassword" ? "confirm password" : e}
              isValid={getValidity(e)?.isValid}
              error={getValidity(e)?.message}
              id={e}
            />
          );
        })}
        <CustomButton text="Create Account" type="submit" theme="success" />
      </form>
    </div>
  );
}
