import { data } from '@/data';

export async function createAccount(
  username: string,
  email: string,
  password: string,
  abortController?: AbortController
) {
  const res = await fetch(data.apiUrl + '/auth/create-account', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
    credentials: 'include',
    signal: abortController?.signal,
  });

  return res.json();
}

export async function logIn(
  args: (
    | { logInWith: 'username'; username: string }
    | { logInWith: 'email'; email: string }
  ) & {
    password: string;
  },
  abortController?: AbortController
) {
  const body = JSON.stringify(
    args.logInWith === 'email'
      ? { email: args.email, password: args.password }
      : { username: args.username, password: args.password }
  );

  const res = await fetch(data.apiUrl + '/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
    credentials: 'include',
    signal: abortController?.signal,
  });

  return res.json();
}
