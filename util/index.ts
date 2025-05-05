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
