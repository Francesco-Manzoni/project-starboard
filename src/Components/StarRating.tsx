import IconButton from '@mui/material/IconButton';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { updateStars } from '../db';
import { useQueryClient } from '@tanstack/react-query';

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
    <>
      {stars}
      <IconButton onClick={handleStarClick}>
        {alreadyStarred ? <Star /> : <StarBorder />}
      </IconButton>
    </>
  );
};
