import { Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import {styled} from "@mui/material/styles";

export const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);

export const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
}));

