//webServices
import { api } from "./api";
import { internalServerError, successStatus } from "../utils/format-response";

//login
export const loginWs = (data) =>
  api.post("/auth/login", data).then(successStatus).catch(internalServerError);
//signup
export const signupWs = (data) =>
  api.post("/auth/signup", data).then(successStatus).catch(internalServerError);

//logout            //no ocupamos mandar los datos (data)
export const logoutWs = () =>
  api.get("/auth/logout").then(successStatus).catch(internalServerError);
