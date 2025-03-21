import prisma from "../client";
import { IUser } from "~/types/IUser";

export async function getUserByEmail(email: string): Promise<IUser | null> {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      username: true,
    },
  });

  return user ? (user as IUser) : null;
}

export async function getUserByUsername(
  username: string
): Promise<IUser | null> {
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: {
      id: true,
      username: true,
    },
  });

  return user ? (user as IUser) : null;
}

export async function createUser(userData: IUser) {
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      name: userData.name,
      email: userData.email,
      loginType: userData.loginType,
      password: userData.password,
    },
  });
  
  return user as IUser;
}
