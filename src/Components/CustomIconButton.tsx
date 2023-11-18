import { IconButton, styled } from '@mui/material';

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '&:focus': {
    outline: 'none',
    border: 'none',
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
  },
}));
