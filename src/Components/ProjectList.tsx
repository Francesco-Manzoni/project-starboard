import { Box, Typography, useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Project } from '../db';
import theme from '../theme';
import { StarRating } from './StarRating';
interface ProjectListProps {
  projects: Project[];
}
export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {projects.map((project) => (
        <React.Fragment key={project.name}>
          <ListItem
            alignItems='flex-start'
            secondaryAction={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StarRating
                  stars={project.stars}
                  alreadyStarred={project.alreadyStarred}
                  id={project.id!}
                />
                <Typography variant='caption'>
                  {project.createdAt?.toLocaleDateString(navigator.language, {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Typography>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundImage: `linear-gradient(to right, #${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)}, #${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)})`,
                }}
              >
                {project.name
                  .split(' ')
                  .map((letter) => letter[0].toUpperCase())}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={project.name}
              secondary={project.description}
            />
          </ListItem>
          <Divider variant='inset' component='li' />
        </React.Fragment>
      ))}
    </List>
  );
};
