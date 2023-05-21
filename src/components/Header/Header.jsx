import { Badge, Box, Grid, Typography } from "@mui/material";
import {ReactComponent as Star} from './star.svg'
import "./Header.css"

export default function Header ({score, restartGame}) {
    return (
        <Box>
            <Grid container alignItems={'center'} justifyContent={'center'} columnGap={4} sx={{padding: '2%'}}>
                    <Grid item xs={3} sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography fontWeight={'bold'} color={'white'} onClick={restartGame}>NEW GAME</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Typography color={'white'}>SCORE</Typography>
                        <Typography color={'white'}>{score.score}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{backgroundColor: 'gray', padding: '10px', borderRadius: '7px', textAlign: 'center'}}>
                        <Badge badgeContent={<Star id="bestScore-star"/>}>
                            <Typography color={'white'}>BEST SCORE</Typography>
                        </Badge>
                        <Typography color={'white'}>{score.bestScore}</Typography>
                    </Grid>
            </Grid>
        </Box>
    )
}