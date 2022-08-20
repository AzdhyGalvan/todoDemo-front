//webServices
import { api } from "./api";
import { internalServerError, successStatus } from "../utils/format-response";

export const editUserWs = (data) =>
  api.patch("/user/edit-profile", data).then(successStatus).catch(internalServerError);