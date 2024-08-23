import { UserDocument } from "../model/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
