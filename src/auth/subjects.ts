import { createSubjects } from "@openauthjs/openauth/subject";
import { valibotUser } from "~/schema";

export const subjects = createSubjects({
  user: valibotUser,
});
