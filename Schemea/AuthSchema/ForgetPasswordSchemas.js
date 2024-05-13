import { boolean, object, string , number} from "yup";

export const ForgetPasswordSchema = object({
    email: string().email().required(),
     
  });
