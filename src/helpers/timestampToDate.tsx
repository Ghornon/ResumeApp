import { Timestamp } from 'firebase/firestore';

export const timestampToDateTime = (timestamp: Timestamp) => {
    const newDate = new Date(timestamp.seconds * 1000);
    return newDate.toLocaleString();
};

export const timestampToDate = (timestamp: Timestamp) => {
    const newDate = new Date(timestamp.seconds * 1000);
    const month = newDate.toLocaleString('default', { month: 'short' });
    const year = newDate.getUTCFullYear();
    return `${month} ${year}`;
};
