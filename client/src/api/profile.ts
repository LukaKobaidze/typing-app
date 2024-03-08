import { ICustomize } from '@/context/profile.context';
import { data } from '@/data';

export async function httpGetProfile(filter?: string[]) {
  const res = await fetch(
    data.apiUrl + '/profile' + (filter ? `?filter=${filter.join(',')}` : ''),
    { credentials: 'include' }
  );

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
