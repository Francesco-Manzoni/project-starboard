import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import { useQueryClient } from '@tanstack/react-query';
import { updateStars } from '../db';
import { CustomIconButton } from './CustomIconButton';
import { Box, Typography } from '@mui/material';

export const StarRating = ({
  stars,
  alreadyStarred = false,
  id,
}: {
  id: number;
  stars: number;
  alreadyStarred?: boolean;
}) => {
  const queryClient = useQueryClient();
  const handleStarClick = async () => {
    await updateStars(id);
    queryClient.invalidateQueries(['projects']);
  };

  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
      <Typography>{stars}</Typography>
      <CustomIconButton onClick={handleStarClick}>
        {alreadyStarred ? <Star /> : <StarBorder />}
      </CustomIconButton>
    </Box>
  );
};
