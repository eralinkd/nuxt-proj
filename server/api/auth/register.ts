import { eventHandler } from "h3";
import bcrypt from "bcrypt";
import { IUser } from "~/types/IUser";
import { doesUserExist } from "~/server/services/userService";
import { createUser } from "~/server/database/repositories/userRepository";
import { makeSession } from "~/server/services/sessionService";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const { username, name, email, password } = body;

  const userExists = await doesUserExist(email, username);

  if (userExists.value) {
    throw createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      message: userExists.message,
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData: IUser = {
    username,
    name,
    email,
    loginType: "email",
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  return await makeSession(user, event);
});
