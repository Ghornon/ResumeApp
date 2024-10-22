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

export const timestampToDateString = (timestamp: Timestamp, dateFormat: string) => {
    const newDate = new Date(timestamp.seconds * 1000);

    const month = newDate.getUTCMonth();
    const year = newDate.getUTCFullYear();

    switch (dateFormat) {
        case 'mm/yyyy':
            return `${month}/${year}`;
        case 'yyyy/mm':
            return `${year}/${month}`;
        case 'mm-yyyy':
            return `${month}-${year}`;
        case 'yyyy-mm':
            return `${year}-${month}`;
        case 'mm.yyyy':
            return `${month}.${year}`;
        case 'yyyy.mm':
            return `${year}.${month}`;
    }

    return `${month}/${year}`;
};
