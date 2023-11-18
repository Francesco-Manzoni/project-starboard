import { Typography } from '@mui/material';

const formatDate = (date: Date) => {
  return date.toLocaleDateString(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
  });
};

const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate: Date) => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

export const ProjectDate = ({ date }: { date?: Date }) => {
  if (!date) return null;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1)
    return <Typography variant='caption'>Just created</Typography>;
  if (isToday(date))
    return (
      <Typography variant='caption'>Today at {formatDate(date)}</Typography>
    );
  if (isYesterday(date))
    return (
      <Typography variant='caption'>Yesterday at {formatDate(date)}</Typography>
    );

  return (
    <Typography variant='caption'>
      {date.toLocaleDateString(navigator.language, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })}
    </Typography>
  );
};
