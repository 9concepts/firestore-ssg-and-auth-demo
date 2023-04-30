import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

type Data = {
  email: string;
  password: string;
};

const assignSession = (res: NextApiResponse, idToken: string) => {
  const SESSION_KEY = "session";
  const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24, // 1day
    httpOnly: true,
    secure: true,
    path: "/",
  };
  setCookie({ res }, SESSION_KEY, idToken, COOKIE_OPTIONS);
};

const signUp = async (email: string, password: string) => {
  const body = JSON.stringify({ email, password, returnSecureToken: true });
  console.log(body);
  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  return await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_REST_API_URL}/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;
  const response = await signUp(email, password);
  if (!response.ok) {
    console.error(response);
    throw new Error("authentication error");
  }
  const { idToken } = await response.json();
  assignSession(res, idToken);

  res.status(200).end();
}
