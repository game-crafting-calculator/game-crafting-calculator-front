interface IObjectKeys {
  [key: string]: any;
}

export interface User extends IObjectKeys {
  _id?: number;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  registration_date?: Date;
  last_connection?: Date;
  verified?: Boolean;
}

export interface FormFieldError extends IObjectKeys {
  message: string;
  isValid: boolean;
}

export interface FormFieldValid extends IObjectKeys {
  isValid: boolean;
}
