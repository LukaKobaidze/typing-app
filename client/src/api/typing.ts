import { TypingResult } from '@/types';
import { data } from '@/data';

export async function httpTypingStarted() {
  const res = await fetch(data.apiUrl + '/typing/started', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(await res.json());
  }

  return res.json();
}

export async function httpTypingCompleted(result: TypingResult) {
  const transformedResult = { ...result };

  delete transformedResult.date;

  const res = await fetch(data.apiUrl + '/typing/completed', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(transformedResult),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(await res.json());
  }

  return res.json();
}
