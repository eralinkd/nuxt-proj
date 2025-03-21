import {
  getUserByEmail,
  getUserByUsername,
} from "~/server/database/repositories/userRepository";

type ExistCheck = {
  value: boolean;
  message?: string;
};

type RegistrationErrors = {
  emailError?: string;
  usernameError?: string;
};

export async function doesUserExist(
  email: string,
  username: string
): Promise<ExistCheck> {
  const hasEmail = await getUserByEmail(email);
  const hasUsername = await getUserByUsername(username);
  const emailExist = hasEmail !== null;
  const usernameExist = hasUsername !== null;

  const errors: RegistrationErrors = {};

  if (emailExist) {
    errors.emailError = `Email ${email} already in use`;
  }

  if (usernameExist) {
    errors.usernameError = `Username ${username} already in use`;
  }

  if (emailExist || usernameExist) {
    const message = JSON.stringify(errors);
    return {
      value: true,
      message,
    };
  } else {
    return {
      value: false,
    };
  }
}
