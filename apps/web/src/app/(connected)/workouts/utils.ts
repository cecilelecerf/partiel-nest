export const getTotalDuration = (array: { duration?: number }[]) => {
  return array.reduce((acc, { duration }) => acc + (duration ?? 0), 0);
};

export const formatDuration = (duration: number) => {
  const hour = Math.floor(duration / 60);
  const min = Math.floor(duration % 60);
  return { hour, min };
};
