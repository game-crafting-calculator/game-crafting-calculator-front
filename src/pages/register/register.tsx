import React, { useEffect, useState } from "react";
import userService from "../../services/user-service";
import { User } from "../../types";

export default function Register() {
  const [formValues, setFormValues] = useState<User>({});
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    let newFormValues = { ...formValues };
    newFormValues[name] = value;
    setFormValues(newFormValues);
  };

  const handleSubmit = () => {
    for (const field in formValues) {
      if (!formValues.hasOwnProperty(field)) {
        return false;
      }
    }

    let { password, confirmPassword } = formValues;
    if (password !== confirmPassword) {
      return false;
    }

    userService.register(formValues);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {}
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
