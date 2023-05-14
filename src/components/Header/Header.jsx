import { Box, Stack, Grid, Typography } from "@mui/material";

export default function GameOverScreen ({score, bestScore}) {

    return (
        <Box>
            <Stack sx={{marginTop: '10px'}} direction={'row'} justifyContent={'space-evenly'}>
                    <Box sx={{backgroundColor: '#ecc400', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography>2048</Typography>
                    </Box>
                    <Box sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>SCORE</Typography>
                        <Typography color={'white'}>{score}</Typography>
                    </Box>
                    <Box sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>BEST SCORE</Typography>
                        <Typography color={'white'}>{bestScore}</Typography>
                    </Box>
            </Stack>
        </Box>
    )
}