import { ICustomize } from '@/context/profile.context';
import { data } from '@/data';

export type GetProfileFilterType = 'username' | 'customize' | 'stats';

export async function httpGetProfile() {
  const res = await fetch(data.apiUrl + '/profile', { credentials: 'include' });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpGetHistory(
  page: number = 1,
  limit: number = 10,
  abortController?: AbortController
) {
  const res = await fetch(
    data.apiUrl + `/profile/history?page=${page}&limit=${limit}`,
    {
      credentials: 'include',
      signal: abortController?.signal,
    }
  );

  if (!res.ok) {
    throw new Error();
  }

  return res.json();
}

export async function httpPostCustomize(customize: Partial<ICustomize>) {
  const res = await fetch(data.apiUrl + '/profile/customize', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(customize),
    credentials: 'include',
  });

  return res.json();
}

export async function httpClearHistory(password: string) {
  const res = await fetch(data.apiUrl + '/profile/clear-history', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
    credentials: 'include',
  });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}

export async function httpResetStats(password: string) {
  const res = await fetch(data.apiUrl + '/profile/reset-stats', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
    credentials: 'include',
  });

  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res.json();
}
