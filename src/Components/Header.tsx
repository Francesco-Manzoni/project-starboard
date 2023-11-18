import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {
  AppBar,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { alpha, styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { Project } from '../db';
import { CustomIconButton } from './CustomIconButton';
import NewProjectModal from './NewProjectModal';
interface HeaderProps {
  projects: Project[];
  setFilteredData: React.Dispatch<React.SetStateAction<Project[]>>;
}
export const Header: React.FC<HeaderProps> = ({
  projects,
  setFilteredData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortField, setSortField] = React.useState<keyof Project>('name');
  const [sortOrder, setSortOrder] = React.useState<'ascending' | 'descending'>(
    'ascending'
  );
  const [showTopProjects, setShowTopProjects] = React.useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTopProjects(false);
    const query = event.target.value;
    setSearchQuery(query);
    updateProjects(query, sortField, sortOrder);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setShowTopProjects(false);
    setSortField(event.target.value as keyof Project);
    updateProjects(searchQuery, event.target.value as keyof Project, sortOrder);
  };

  const handleSortOrderChange = (value: typeof sortOrder) => {
    setShowTopProjects(false);
    setSortOrder(value);
    updateProjects(searchQuery, sortField, value);
  };

  const updateProjects = (
    query: string,
    sortField: keyof Project,
    sortOrder: string
  ) => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );

    // Sorting logic
    filtered.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (!fieldA) return 1;
      if (!fieldB) return -1;
      if (sortOrder === 'ascending') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  };

  const handleTopProjectsClick = () => {
    setShowTopProjects(!showTopProjects); // Toggle showing top projects

    if (!showTopProjects) {
      // When we want to show top projects, sort and take top 3
      const topProjects = [...projects]
        .sort((a, b) => b.stars - a.stars) // Assuming 'stars' is the correct field
        .slice(0, 3);

      setFilteredData(topProjects);
    } else {
      // If we want to go back to normal view
      updateProjects(searchQuery, sortField, sortOrder);
    }
  };

  React.useEffect(() => {
    updateProjects(searchQuery, sortField, sortOrder);
  }, [projects]); // Re-run when projects change

  return (
    <>
      <AppBar position='fixed'>
        <ToolbarStyled>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Projects
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
              endAdornment={
                <Tooltip title='Show top projects'>
                  <StyledIconButton
                    onClick={handleTopProjectsClick}
                    color='inherit'
                    edge='end'
                    aria-label='top projects'
                  >
                    {showTopProjects ? <StarIcon /> : <StarOutlineIcon />}
                  </StyledIconButton>
                </Tooltip>
              }
            />
          </Search>
          <FormControlStyled>
            <InputLabel id='sort-label'>Sort by:</InputLabel>
            <Select
              labelId='sort-label'
              id='sort'
              value={sortField}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Sort by' }}
              label='Sort by:'
              size='small'
              endAdornment={
                <Tooltip
                  title={
                    'Sort ' + sortOrder === 'ascending'
                      ? 'Ascending'
                      : 'Descending'
                  }
                >
                  <StyledIconButton
                    color='inherit'
                    onClick={() =>
                      handleSortOrderChange(
                        sortOrder === 'ascending' ? 'descending' : 'ascending'
                      )
                    }
                  >
                    {
                      {
                        ascending: <ArrowUpwardIcon />,
                        descending: <ArrowDownwardIcon />,
                      }[sortOrder]
                    }
                  </StyledIconButton>
                </Tooltip>
              }
              IconComponent={ArrowDropDownIcon}
            >
              <MenuItem value='name'>Name</MenuItem>
              <MenuItem value='stars'>Stars Number</MenuItem>
              <MenuItem value='createdAt'>Creation Date</MenuItem>
            </Select>
          </FormControlStyled>

          {isMobile ? (
            <CustomIconButton color='secondary' onClick={handleModal}>
              <AddCircleIcon fontSize='large' />
            </CustomIconButton>
          ) : (
            <Button
              variant='contained'
              color='secondary'
              sx={{
                marginLeft: 1.5,
                fontSize: isMobile ? '0.5rem' : 'inherit',
              }}
              onClick={handleModal}
            >
              Add Project
            </Button>
          )}
        </ToolbarStyled>
      </AppBar>
      <Offset />
      <NewProjectModal open={open} onClose={handleModal} />
    </>
  );
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  minWidth: '8rem',
  '& .MuiSvgIcon-root': {
    color: theme.palette.common.white,
  },
  '& .MuiSelect-select': {
    color: theme.palette.common.white,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.common.white,
  },
}));

const StyledIconButton = styled(CustomIconButton)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
}));

const ToolbarStyled = styled(Toolbar)(() => ({
  alignItems: 'center',
}));
