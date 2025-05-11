export function getTimeInMinutes(timerInSeconds) {
    const minutes = Math.floor(timerInSeconds / 60);
    const seconds = timerInSeconds % 60;
    const result = `${padTo2Digits(minutes)}:${Math.round(
        padTo2Digits(seconds)
    )}`;

    return result;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
