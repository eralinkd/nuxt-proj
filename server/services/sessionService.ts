import {
  createSession,
  getSessionByAuthToken,
} from "~/server/database/repositories/sessionRepository";
import { IUser } from "~/types/IUser";
import { v4 as uuidv4 } from "uuid";
import { H3Event } from "h3";

export async function makeSession(
  user: IUser,
  event: H3Event
): Promise<IUser> {
  const authToken = uuidv4().replace("-", "");
  const session = await createSession({
    authToken: authToken,
    userId: user.id,
  });
  const userId = session.userId;

  if (userId) {
    setCookie(event, "auth_token", authToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return getUserBySessionToken(authToken);
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
  });
}

export async function getUserBySessionToken(authToken: string) {
  const session = await getSessionByAuthToken(authToken);
  return session.user;
}
