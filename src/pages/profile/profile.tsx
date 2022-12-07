import React, { useEffect, useState, useContext } from "react";
import userService from "../../services/user-service";
import { User, FormFieldError, FormFieldValid } from "../../types";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";

import { UserContext } from "../../global-context";

import "./profile.css";
import validateEmail from "../../utils/email-validator";

export default function Profile() {
  const [user, setUser] = useContext(UserContext);

  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "12345678",
    confirmPassword: "12345678",
  });

  const [formError, setFormError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log(edit);
  }, [edit]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getProfile = async () => {
    const [result, data] = await userService.getProfile(user);
    data.registration_date = new Date(data.registration_date).toUTCString();
    data.last_connection = new Date(data.last_connection).toUTCString();
    setUser(data);
    setFormData(user);
  };

  const validateForm = async () => {
    //validate email
    let isValid = true;

    if (formData.email && !validateEmail(formData.email)) {
      setFormError((values: any) => ({ ...values, email: "invalid email" }));
      isValid = false;
    }

    //validate password
    if (
      formData.password !== "12345678" &&
      formData.password !== formData.confirmPassword
    ) {
      setFormError((values: any) => ({
        ...values,
        password: "password does not match",
        confirmPassword: "password does not match",
      }));

      isValid = false;
    }

    if (isValid) {
      setFormError({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((values: any) => ({ ...values, [name]: value }));
  };

  const submit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return false;
    }

    const [result, data] = await userService.updateProfile(formData);
    if (result) {
      setUser((values: any) => ({
        ...values,
        username: formData.username,
        email: formData.email,
      }));
    }
  };

  return edit ? (
    <div className="profile edit">
      <h1>Profile</h1>
      <form className="data" onSubmit={submit}>
        <div className="field username">
          <label htmlFor="username">Username</label>
          <CustomTextInput
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          <span>{formError.username}</span>
        </div>
        <div className="field email">
          <label htmlFor="email">Email</label>
          <CustomTextInput
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
          <span>{formError.email}</span>
        </div>
        <div className="field password">
          <label htmlFor="password">Password</label>
          <CustomTextInput
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span>{formError.password}</span>
        </div>
        <div className="field confirmPassword">
          <label htmlFor="confirmPassword">Confirm password</label>
          <CustomTextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span>{formError.confirmPassword}</span>
        </div>

        <CustomButton type="submit" theme="success" text="Edit profile" />
        <CustomButton
          type="submit"
          theme="warn"
          text="Cancel"
          onClick={() => setEdit(false)}
        />
      </form>
    </div>
  ) : (
    <div className="profile">
      <h1>Profile</h1>
      <div className="data">
        <div className="username">
          <h2>{user.username}</h2>
          <CustomButton
            theme="warn"
            text="Edit"
            onClick={() => {
              setEdit(true);
              console.log("EDIT");
            }}
          />
        </div>
        <div className="email">
          <p>Email</p>
          <p>{user.email}</p>
        </div>
        <div className="registration">
          <p>Registration date</p>
          <p>{user.registration_date}</p>
        </div>
        <div className="last">
          <p>Last connection</p>
          <p>{user.last_connection}</p>
        </div>
      </div>
    </div>
  );
}
