import React, { useEffect, useState } from 'react';

export type useTimeLeftResult = {
  day: string;
  hour: string;
  minute: string;
  second: string;
};
// タイムセールの残り時間の表示に使用するHooks
export const useTimeLeft = (endAt: string): useTimeLeftResult => {
  const nowDate = new Date();
  const endDate = new Date(endAt);
  const [diffMillisecond, setDiffMillisecond] = useState(
    endDate.getTime() - nowDate.getTime()
  );
  const [day, setDay] = useState<string>('-');
  const [hour, setHour] = useState<string>('-');
  const [minute, setMinute] = useState<string>('-');
  const [second, setSecond] = useState<string>('-');

  useEffect(() => {
    const countDown = setInterval(() => {
      setDiffMillisecond((d) => d - 1000);
    }, 1000);
    return () => clearInterval(countDown);
  }, []);

  useEffect(() => {
    const diffSec = Math.floor(diffMillisecond / 1000);
    const day = Math.floor(diffSec / (24 * 60 * 60));
    const hour = Math.floor((diffSec % (24 * 60 * 60)) / (60 * 60));
    const minute = Math.floor(((diffSec % (24 * 60 * 60)) % (60 * 60)) / 60);
    const second = ((diffSec % (24 * 60 * 60)) % (60 * 60)) % 60;

    setDay(String(day).padStart(2, '0'));
    setHour(String(hour).padStart(2, '0'));
    setMinute(String(minute).padStart(2, '0'));
    setSecond(String(second).padStart(2, '0'));
  }, [diffMillisecond]);

  return {
    day,
    hour,
    minute,
    second,
  };
};
