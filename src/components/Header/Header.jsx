import { Box, Stack, Grid, Typography } from "@mui/material";

export default function GameOverScreen ({score, bestScore}) {

    return (
        <Box sx={{marginTop: '10px'}}>
            <Grid container alignItems={'center'} justifyContent={'center'} columnGap={4} sx={{padding: '2%'}}>
                    <Grid item xs={3} sx={{height: 'max-content', backgroundColor: '#ecc400', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography>2048</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{height: 'max-content', backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>SCORE</Typography>
                        <Typography color={'white'}>{score}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{height: 'max-content', backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>BEST SCORE</Typography>
                        <Typography color={'white'}>{bestScore}</Typography>
                    </Grid>
            </Grid>
        </Box>
    )
}