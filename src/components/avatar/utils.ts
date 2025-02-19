export const getInitials = (name?: string): string => {
  if (!name) {
    return '';
  }

  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].slice(0, 2).toUpperCase();
  }

  return names
    .filter((_, index) => index === 0 || index === names.length - 1)
    .map(name => name[0])
    .join('')
    .toUpperCase();
};
