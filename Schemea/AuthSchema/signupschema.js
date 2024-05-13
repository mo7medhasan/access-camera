import { boolean, object, string , number} from "yup";

export const SignUPformSchema = object({
    username: string().required(),
    Phone: number().optional(),
    email: string().email().required(),
    password: string().min(6).required(),
    checkbox:boolean().oneOf([true],`
    You Have To Agree to terms & conditions
    `).required()
  });
