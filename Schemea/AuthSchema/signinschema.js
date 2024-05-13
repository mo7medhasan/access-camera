import { boolean, object, string , number} from "yup";

export const SignINformSchema = object({
    email: string().email().required(),
    password: string().min(6).required(),
    
  });
