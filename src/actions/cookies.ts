"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const requestCookies = await cookies();
  requestCookies.set(key, value);
}

export async function getCookie(key: string) {
  const requestCookies = await cookies();
  if (!requestCookies.has(key)) {
    return null;
  }

  return requestCookies.get(key)?.value;
}

export async function deleteCookie(key: string) {
  const requestCookies = await cookies();
  requestCookies.delete(key);
}
