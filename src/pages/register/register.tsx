import React, { useContext, useEffect, useState } from "react";
import userService from "../../services/user-service";
import { User, FormFieldError, FormFieldValid } from "../../types";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";

import "./register.css";
import validateEmail from "../../utils/email-validator";
import { UserContext } from "../../global-context";

export default function Register() {
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

    let result = await userService.register(formValues);

    if (result) {
      window.location.reload();
    }
  };

  const getValidity = (fieldName: string) => {
    if (!formErrors[fieldName]) {
      return undefined;
    }

    return formErrors[fieldName].isValid;
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
            <div className={"field " + getErrorCSSClass(e)}>
              <label htmlFor={e}>{getLabelText(e)}</label>
              <CustomTextInput
                type={inputTypes[e]}
                // placeholder={e}
                name={e}
                onChange={handleChange}
                isValid={getValidity(e)}
                id={e}
              />
              <span className="error">{formErrors[e]?.message || ""}</span>
            </div>
          );
        })}
        <CustomButton text="Create Account" type="submit" theme="success" />
      </form>
    </div>
  );
}
