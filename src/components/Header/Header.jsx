import { Box, Grid, Typography } from "@mui/material";

export default function GameOverScreen ({score, bestScore}) {

    return (
        <Box>
            <Grid container>
                <Grid item xs={4}>
                    {/* logo */}
                    <Box sx={{backgroundColor: '#ecc400', borderRadius: '3px', textAlign: 'center'}}>
                        <Typography variant="h1">2048</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sx={{backgroundColor: '#bbada0', borderRadius: '3px', textAlign: 'center'}}>
                    {/* score */}
                    <Typography variant="h2">SCORE</Typography>
                    <Typography variant="h3">{score}</Typography>
                </Grid>
                <Grid item xs={4} sx={{backgroundColor: '#bbada0', borderRadius: '3px', textAlign: 'center'}}>
                    {/* best score */}
                    <Typography variant="h2">BEST SCORE</Typography>
                    <Typography variant="h3">{bestScore}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}