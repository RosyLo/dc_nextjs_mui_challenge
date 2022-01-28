import { FC } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
