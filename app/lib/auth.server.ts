import { prisma } from "~/db/prisma.server";
import bcryptjs from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const { hash, compare } = bcryptjs;

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) throw new Error("Session secret required!");

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype); // Ensure proper prototype chain
  }
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

// Create session
async function createUserSession(userID: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userID", userID);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

// Get user from session
export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userID = session.get("userID");

  if (!userID) {
    return null;
  }

  return userID;
}

// Destroy user session
export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

// Require user session
export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}

// Signup
export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new CustomError("Email already exists!", 422);
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    throw new CustomError("User creation failed!", 500);
  }

  return createUserSession(user.id, "/expenses");
}

// Login
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new CustomError("Email doesn't exist!", 401);
  }

  const isPasswordCorrect = await compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    throw new CustomError("Wrong password!", 401);
  }

  return createUserSession(existingUser.id, "/expenses");
}
