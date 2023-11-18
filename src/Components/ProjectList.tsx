import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { StarRating } from './StarRating';
import { Project } from '../db';
interface ProjectListProps {
  projects: Project[];
}
export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {projects.map((project) => (
        <React.Fragment key={project.name}>
          <ListItem
            alignItems='flex-start'
            secondaryAction={
              <>
                <StarRating
                  stars={project.stars}
                  alreadyStarred={project.alreadyStarred}
                  id={project.id!}
                />
                {project.createdAt?.toDateString()}
              </>
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
