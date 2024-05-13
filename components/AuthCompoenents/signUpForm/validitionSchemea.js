import { boolean, object, string ,ref} from "yup";

export const formSchema = object({
    username: string().required(),
    Phone: string().required(),
    email: string().email().required(),
    password: string().min(6).required(),
    checkbox:boolean().oneOf([true],`
    You Have To Agree to terms & conditions
    `).required()
  });
