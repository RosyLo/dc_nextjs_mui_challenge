import type { NextPage } from 'next'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

const User: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container>
            <Typography>Profile Page of user {id}</Typography>
        </Container>
    )
}

export default User