export const getTimeBetweenDateAndNow = (date: Date) => {
  const start = new Date().getTime();
  const end = new Date(date).getTime();

  const seconds = Math.abs(Math.round((end - start) / 1000));

  if (seconds < 60) return `${seconds} second${seconds > 1 ? 's' : ''}`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minute${seconds / 60 > 2 ? 's' : ''}`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} heure${seconds / 3600 > 2 ? 's' : ''}`;
  if (seconds < 2592000)
    return `${Math.floor(seconds / 86400)} jour${seconds / 86400 > 2 ? 's' : ''}`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} mois`;
  return `${Math.floor(seconds / 31536000)} an${seconds / 31536000 > 2 ? 's' : ''}`;
};

export const getFormatedDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};
