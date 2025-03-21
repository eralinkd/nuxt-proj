import { IUser } from "~/types/IUser";
import prisma from "~/server/database/client";
import { ISession } from "~/types/ISession";

export async function createSession(data: ISession) {
  if (!data.userId || !data.authToken) {
    throw new Error("userId and authToken are required");
  }

  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken,
    },
  });
}

export async function getSessionByAuthToken(authToken: string) {
  const user: IUser = await getUserBySessionToken(authToken);
  return { authToken, user };
}

async function getUserBySessionToken(authToken: string): Promise<IUser> {
  const session = await prisma.session.findUnique({
    where: { authToken: authToken },
    include: { user: true },
  });

  if (!session) {
    throw new Error("Session not found");
  }

  return session.user as IUser;
}
