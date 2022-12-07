export const validateEmail = (email: string | undefined) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailRegex.test(email || "");
};

export const missingField = (obj: any) => {
  let missing = [];
  for (const field of Object.keys(obj)) {
    if (obj[field] === undefined) {
      missing.push(field);
    }
  }

  return missing;
};

export default validateEmail;
