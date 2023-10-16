import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useProjects } from '../hooks/useProjects';
import { StarRating } from './StarRating';

export const ProjectList = () => {
  const { projects } = useProjects();
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {projects.map((project) => (
        <React.Fragment key={project.name}>
          <ListItem
            alignItems='flex-start'
            secondaryAction={
              <StarRating
                stars={project.stars}
                alreadyStarred={project.alreadyStarred}
                id={project.id!}
              />
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
              secondary={<React.Fragment>{project.description}</React.Fragment>}
            />
          </ListItem>
          <Divider variant='inset' component='li' />
        </React.Fragment>
      ))}
    </List>
  );
};
