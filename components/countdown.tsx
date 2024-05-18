// components/CountdownTimer.tsx
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(endDate).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatTimeLeft = (): string => {
    return `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''} ${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''} ${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 's' : ''} ${timeLeft.seconds} second${timeLeft.seconds !== 1 ? 's' : ''}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{formatTimeLeft()}</p>
    </div>
  );
};

export default CountdownTimer;
