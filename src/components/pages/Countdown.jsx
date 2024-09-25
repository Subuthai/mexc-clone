import React, { useState, useEffect } from 'react';

const CountdownT = ({ year, month, day, hour, minute, second }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMin = minute < 10 ? `0${minute}` : minute;
        const formattedSec = second < 10 ? `0${second}` : second;
        const targetDate = new Date(`${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMin}:${formattedSec}`);
        const now = new Date();
        let difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        difference -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(difference / (1000 * 60));
        difference -= minutes * 1000 * 60;

        const seconds = Math.floor(difference / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
            <>
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </>

    );
};
export default CountdownT;