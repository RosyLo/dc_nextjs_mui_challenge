import { FC } from 'react';
import { Box } from '@mui/material';

export const Block: FC = ({ children }) => {
  return (
    <Box
      sx={{
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

interface StackProps {
  hasLeftIndent?: boolean;
}

export const Stack: FC<StackProps> = ({ hasLeftIndent, children }) => {
  return (
    <Box sx={{ display: 'flex', m: `0 0 0 ${hasLeftIndent ? '10' : '0'}px` }}>
      {children}
    </Box>
  );
};
