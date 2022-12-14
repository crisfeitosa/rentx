import { eachDayOfInterval, format, parseISO } from 'date-fns';

import theme from '../../styles/theme';
import { DateData } from 'react-native-calendars/src/types';

import { MarkedDateProps } from '.';

export function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({ start: parseISO(start.dateString), end: parseISO(end.dateString) })
    .forEach((item) => {
      const date = format(item, 'yyyy-MM-dd');

      interval = {
        ...interval,
        [date]: {
          color: start.dateString === date || end.dateString === date
          ? theme.colors.main : theme.colors.main_light,

          textColor: start.dateString === date || end.dateString === date
          ? theme.colors.main_light : theme.colors.main
        }
      }
    }
  );

  return interval;
};
