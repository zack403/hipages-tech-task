export const formatDateAndTime1 = (dateTime: Date): string => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const result = `${month} ${day} @ ${time.toLowerCase()}`
    return result;
}

export const formatDateAndTime2 = (dateTime: Date): string => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const result = `${month} ${day} ${year} @ ${time.toLowerCase()}`
    return result;
}