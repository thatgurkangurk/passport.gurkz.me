import { createSubjects } from "@openauthjs/openauth/subject";
import { valibotUser } from "~/db";

export const subjects = createSubjects({
  user: valibotUser,
});
