import {  object, string } from "yup";

export const ResetPassword = object({
     password: string().min(6).required(),
    
  });
