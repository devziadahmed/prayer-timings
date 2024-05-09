import { useEffect, useState } from "react";
import { msToTime } from "../utils/helpers";

/**
 *
 * @param duration The duration in miliseconds to countdown from
 * @param callback The callback function to be executed
 * @param interval The interval time
 */
function Timer({
  duration,
  callback,
  interval = 1000,
  prayerName,
  refreshTime = 30000,
}: {
  duration: number;
  callback: () => void;
  interval?: number;
  prayerName?: string;
  refreshTime?: number;
}) {
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    if (!duration) return;

    const countdown = setInterval(() => {
      const dateNow = new Date().getTime();
      const dateDiff = duration - dateNow;

      setTimer(msToTime(dateDiff));

      if (dateDiff < 0) {
        clearInterval(countdown);
        setTimer(`${prayerName} Started!`);
      }
    }, interval);

    return () => clearInterval(countdown);
  }, [duration, interval, callback, prayerName]);

  useEffect(() => {
    if (timer.includes("Started!")) {
      const refresh = setTimeout(callback, refreshTime);

      return () => clearTimeout(refresh);
    }
  }, [callback, timer, refreshTime]);

  return <div>{timer}</div>;
}

export default Timer;
