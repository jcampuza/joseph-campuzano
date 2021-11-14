export const cn = (...args: (string | Record<string, boolean> | undefined | null)[]) => {
  const res: string[] = [];

  for (const arg of args) {
    if (arg === undefined || arg === null) {
      continue;
    }

    if (typeof arg === 'string') {
      res.push(arg);
    }

    if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          res.push(key);
        }
      }
    }
  }

  return res.join(' ');
};
