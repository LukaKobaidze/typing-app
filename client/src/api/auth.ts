import { data } from '@/data';

export async function httpOauthAccessToken(platform: 'GitHub', code: string) {
  const res = await fetch(
    `${data.apiUrl}/auth/${platform}/access-token?code=${code}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpOauthFinalSteps(platform: 'GitHub', username: string) {
  const res = await fetch(`${data.apiUrl}/auth/${platform}/final-steps`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
    credentials: 'include',
  });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpCreateAccount(
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

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpLogIn(
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

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpLogOut() {
  const res = await fetch(data.apiUrl + '/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpChangeUsername(newUsername: string, password: string) {
  const res = await fetch(data.apiUrl + '/auth/change-username', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ newUsername, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpChangePassword(oldPassword: string, newPassword: string) {
  const res = await fetch(data.apiUrl + '/auth/change-password', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPassword, newPassword }),
    credentials: 'include',
  });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}
