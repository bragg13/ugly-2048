import { Box, Grid, Typography } from "@mui/material";

export default function Header ({score, bestScore}) {

    return (
        <Box>
            <Grid container alignItems={'center'} justifyContent={'center'} columnGap={4} sx={{padding: '2%'}}>
                    <Grid item xs={3} sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography fontWeight={'bold'} color={'white'} onClick={() => console.log()}>NEW GAME</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>SCORE</Typography>
                        <Typography color={'white'}>{score}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>BEST SCORE</Typography>
                        <Typography color={'white'}>{bestScore}</Typography>
                    </Grid>
            </Grid>
        </Box>
    )
}