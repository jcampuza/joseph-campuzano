import { format } from 'date-fns';

export const formatDateLong = (date: Date | number) => {
  return format(new Date(date), 'MMMM dd yyyy');
};
