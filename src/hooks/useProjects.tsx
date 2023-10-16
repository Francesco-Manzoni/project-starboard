import { Project, addProject, getProjects } from '../db';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const defaultProjects: Project[] = [
  {
    name: 'Awesome project',
    description: 'Lorem ipsum dolor sit amet',
    createdAt: '2020-10-11',
    stars: 100,
  },
  {
    name: 'Rocket project',
    description: 'Dolor sit amet',
    createdAt: '2020-10-12',
    stars: 120,
  },
  {
    name: 'Bull project',
    description: 'Ipsum lorem sit',
    createdAt: '2020-09-10',
    stars: 60,
  },
  {
    name: 'Greek project',
    description: 'Felicit ipsum dolor',
    createdAt: '2020-08-12',
    stars: 80,
  },
];

const initializeData = async () => {
  const projects = await getProjects();
  if (projects.length === 0) {
    //add the default projects
    defaultProjects.forEach(async (project: Project) => {
      await addProject(project);
    });
  }

  return projects || defaultProjects;
};

export const useProjects = () => {
  const query = useQuery(['projects'], initializeData);

  return {
    projects: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });

  return {
    addProject: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
