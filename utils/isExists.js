import User from "../models/users.model.js";

export const isExist = async (q) => {
    const user = await User.findOne(q);
  return user ? true : false;

}