

// format time
export function getFormattedTime() {
    const currentTime = new Date();
    const options = { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return currentTime.toLocaleTimeString('en-US', options);
}

// Get the current date and time
export const formattedDate = (date = new Date()) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}