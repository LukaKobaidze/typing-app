import { useState, useCallback, useEffect } from 'react';

export default function useSound(source: string, volume?: number) {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    setAudio(new Audio(source));
  }, [source]);

  const play = useCallback(() => {
    if (!audio) return;
    const clone = audio.cloneNode(true) as HTMLAudioElement;
    clone.volume = volume || 1;
    clone.play();
  }, [audio, volume]);

  return play;
}
