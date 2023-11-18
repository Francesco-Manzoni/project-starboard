import { Box } from '@mui/material';
import React from 'react';
import { Header } from './Components/Header';
import { ProjectList } from './Components/ProjectList';
import { useProjects } from './hooks/useProjects';

function App() {
  const { projects } = useProjects();
  const [filteredData, setFilteredData] = React.useState(projects);
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
      }}
    >
      <Header projects={projects} setFilteredData={setFilteredData} />
      <ProjectList projects={filteredData} />
    </Box>
  );
}

export default App;
