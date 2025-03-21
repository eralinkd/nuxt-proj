import type { ISession } from "~/types/ISession";

export async function registerWithEmail(
  username: string,
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await $fetch<ISession>("/api/auth/register", {
      method: "POST",
      body: {
        username,
        name,
        email,
        password,
      },
    });

    if (response) {
      useState("user").value = response;
      await useRouter().push("/dashboard");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function loginWithEmail(email: string, password: string) {}
