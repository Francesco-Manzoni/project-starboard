import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useAddProject } from '../hooks/useProjects';
interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
}
interface NewProjectForm {
  name: string;
  description?: string;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ open, onClose }) => {
  const { register, handleSubmit, reset } = useForm<NewProjectForm>();

  const { addProject } = useAddProject();

  const handleFormSubmit = (data: NewProjectForm) => {
    addProject({
      name: data.name,
      description: data.description || '',
      stars: Math.floor(Math.random() * 100),
      createdAt: new Date(),
    });
    reset(); // Resetta il form dopo l'invio
    onClose(); // Chiude il modale dopo l'invio
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Project</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin='normal'
            label='Project Name'
            required
            inputProps={{ maxLength: 20 }}
            {...register('name', { required: true })}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Description'
            inputProps={{ maxLength: 50 }}
            {...register('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='secondary'>
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewProjectModal;
