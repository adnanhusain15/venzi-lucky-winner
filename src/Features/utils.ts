import { Field, ResponseItem, User } from "./useForm";

const getParsedResponses = (fields: Field[], responses: ResponseItem[]) => {
  const contactInfoFields = fields.find((i) => i.type === "contact_info")
    .properties.fields;
  const userInfo: User[] = [];
  for (const resp of responses) {
    const info: Partial<User> = {};
    contactInfoFields.forEach((item) => {
      const ans = resp.answers.find((i) => i.field.id === item.id);
      if (item.subfield_key === "first_name") info["firstName"] = ans.text;
      else if (item.subfield_key === "last_name") info["lastName"] = ans.text;
      else if (item.subfield_key === "email") info["email"] = ans.email;
      else if (item.subfield_key === "phone_number")
        info["phoneNumber"] = ans.phone_number;
    });
    userInfo.push(info as User);
  }
  return userInfo;
};

const utils = {
  getParsedResponses,
};
export default utils;
