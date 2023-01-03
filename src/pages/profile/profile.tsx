import React, { useEffect, useState, useContext } from "react";
import { User, FormFieldError, FormFieldValid } from "../../types";
import CustomButton from "../../components/custom-button/custom-button";
import CustomTextInput from "../../components/custom-text-input/custom-text-input";

import { UserContext } from "../../global-context";

import "./profile.css";
import validateEmail from "../../utils/email-validator";

import { AiOutlineStar } from "react-icons/ai";
import apiService from "../../services/api-service";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
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
    try {
      let response = await apiService.user.getProfile();
      response.registration_date = new Date(
        response.registration_date
      ).toUTCString();

      response.last_connection = new Date(
        response.last_connection
      ).toUTCString();

      setUser(response);
      setFormData(user);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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

    try {
      let response = await apiService.user.update(formData);
      await getProfile();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return edit ? (
    <div className="profile edit">
      <h1>Profile</h1>
      <form className="data" onSubmit={submit}>
        {/* <label htmlFor="username">Username</label> */}
        <CustomTextInput
          label="username"
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />

        {/* <label htmlFor="email">Email</label> */}
        <CustomTextInput
          label="email"
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
        />
        {/* <label htmlFor="password">Password</label> */}
        <CustomTextInput
          label="password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* <label htmlFor="confirmPassword">Confirm password</label> */}
        <CustomTextInput
          label="confirm password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="buttons">
          <CustomButton type="submit" theme="success" text="Edit profile" />
          <CustomButton
            type="submit"
            theme="warn"
            text="Cancel"
            onClick={() => setEdit(false)}
          />
        </div>
      </form>
    </div>
  ) : (
    <div className="profile read">
      <h1>Profile</h1>
      <div className="data">
        <div className="username field">
          <h2>{user.username || "Username"}</h2>
          <CustomButton
            theme="warn"
            text="Edit"
            onClick={() => {
              setEdit(true);
              console.log("EDIT");
            }}
          />
        </div>
        <div className="email field">
          <p>Email</p>
          <p>{user.email || "example@gmail.com"}</p>
        </div>
        <div className="registration field">
          <p>Registration date</p>
          <p>{user.registration_date || new Date().toISOString()}</p>
        </div>
        <div className="last field">
          <p>Last connection</p>
          <p>{user.last_connection || new Date().toISOString()}</p>
        </div>
      </div>
    </div>
  );
}
