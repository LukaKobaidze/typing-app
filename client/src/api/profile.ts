import { ICustomize } from '@/context/profile.context';
import { data } from '@/data';

export type GetProfileFilterType = 'username' | 'customize' | 'stats';

export async function httpGetProfile(filter?: GetProfileFilterType[]) {
  const res = await fetch(
    data.apiUrl + '/profile' + (filter ? `?filter=${filter.join(',')}` : ''),
    { credentials: 'include' }
  );

  if (!res.ok) {
    throw new Error();
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

  console.log(res);

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
