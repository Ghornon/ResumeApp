export const getMostFrequentCharacterInRange = (text: string, range: Array<string>) => {
    let max = 0,
        maxChar = '';

    text.split('').forEach((char) => {
        if (text.split(char).length > max && range.indexOf(char) != -1) {
            max = text.split(char).length;
            maxChar = char;
        }
    });

    return maxChar;
};
