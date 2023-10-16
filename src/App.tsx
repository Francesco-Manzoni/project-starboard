import { Box } from '@mui/material';
import { Header } from './Components/Header';
import { ProjectList } from './Components/ProjectList';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
      }}
    >
      <Header />
      <ProjectList />
    </Box>
  );
}

export default App;
