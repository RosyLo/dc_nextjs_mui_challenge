import { FC } from 'react';
import Box from '@mui/material/Box';

type ITitle = {
  color?: string;
};

export const Title: FC<ITitle> = ({ children, color }) => {
  return <Box sx={{ typography: 'h3' }}>{children}</Box>;
};

type IText = {
  type?: string;
  color?: string;
};

export const Text: FC<IText> = ({ type, color, children }) => {
  const textStyle = () => {
    switch (type) {
      case 'contentTitle':
        return { typography: 'body1' };
      case 'content':
        return { typography: 'body2' };
      default:
        return { typography: 'body2' };
    }
  };

  return (
    <Box sx={{ ...textStyle, display: 'inline-block', color: `${color}` }}>
      {children}
    </Box>
  );
};
