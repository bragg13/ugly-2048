function keyPressed(){
    let dir = '';
    if(keyCode==LEFT_ARROW){
  
    }
  
    if(keyCode==RIGHT_ARROW){
        grid.transpose()
        grid.move(newScore => score+=newScore);
        grid.transpose()
        grid.update();
        grid.pushRandom();
    }
  
    if(keyCode==UP_ARROW){
        // reverse, compact, reverse again
        grid.reverse();
        grid.move(newScore => score+=newScore);
        grid.reverse();
        grid.update();
        grid.pushRandom();
    }
    
    if(keyCode==DOWN_ARROW){
        grid.move(newScore => score+=newScore);
        grid.update();
        grid.pushRandom();
    }
    
  }