import * as React from 'react';
import {Dialog, DialogTitle, Box, Stack, Button, Typography} from '@mui/material'

export default function GameOverScreen ({restartGame, score, onClose, open}) {

    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") return
        onClose()
    }

    return (
      <Dialog onClose={handleClose} open={open} className='elevation-3'>
        <DialogTitle sx={{fontWeight: 'bold'}}>Game Over</DialogTitle>
        <Box>
            <Box sx={{padding: '10px', marginLeft: '20px'}}>
                <Typography variant='body1'>
                    You score was <strong>{score.score}</strong> and
                </Typography>
                <Typography variant='body1'>
                    it took you <strong>{score.nmoves}</strong> moves to get there.
                </Typography>
            </Box>
            <Box sx={{padding: '10px', marginLeft: '20px'}}>
                <Typography variant='body1'>Kinda lame.</Typography>
                <Typography variant='body1'>Wanna try again?</Typography>
            </Box>
            <Stack sx={{padding: '10px'}} direction={'row'} gap={4}>
                <Button variant='contained' color='info'>Share on Twitter (?)</Button>
                <Button variant='contained' color='success' onClick={handleClose}>Start new game</Button>
            </Stack>
        </Box>
        
      </Dialog>
    );
}