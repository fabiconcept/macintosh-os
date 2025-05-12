export const getUptimeOutput = (): string => {
    const start = new Date('2025-05-05T21:06:00');
    const now = new Date();
  
    const diffMs = now.getTime() - start.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;
  
    const formattedStart = start.toDateString().replace(/^.*? /, '') + ' ' + start.toTimeString().split(' ')[0];
  
    return `${formattedStart}  up ${days} days,  ${hours}:${minutes.toString().padStart(2, '0')}, 3 users, load averages: 2.12 2.34 2.15`;
  };

  export const downloadHandler = async ({
    fileUrl,
    fileName
}: {
    fileUrl: string;
    fileName: string;
}) => {
    const imageRes = await fetch(fileUrl);

    if (!imageRes.ok) return;

    const imageBlob = await imageRes.blob();
    const imageOutputUrl = URL.createObjectURL(imageBlob);

    const linkElement = document.createElement("a");
    linkElement.href = imageOutputUrl;
    linkElement.setAttribute("download", `${fileName.replace(/\W/g, '_')}`);
    
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
};   


export function sanitizeString(
    input: string,
    options: {
        replaceChar?: string,
        preserveSpaces?: boolean,
        preserveCase?: boolean,
        maxLength?: number
    } = {}
): string {
    if (!input) return '';

    const {
        replaceChar = '_',
        preserveSpaces = false,
        preserveCase = false,
        maxLength
    } = options;

    let result = input

    if (preserveSpaces) {
        result = result.replace(/[^\w\s]/g, replaceChar);
        result = result.replace(/\s+/g, ' ');
    } else {
        result = result.replace(/\W/g, replaceChar);
    }

    result = result.replace(new RegExp(`${replaceChar}{2,}`, 'g'), replaceChar);

    if (!preserveCase) {
        result = result.toLowerCase();
    }

    result = result.replace(new RegExp(`^${replaceChar}+|${replaceChar}+$`, 'g'), '');

    if (maxLength && result.length > maxLength) {
        result = result.substring(0, maxLength);
    }

    return result;
}