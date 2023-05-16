class Tile{
    constructor(x,y,value){
        this.x = x;
        this.y = y;
        this.value = value;
  
        // setting up the sprite
        this.sprite = new Sprite(x*100+100, y*100+320);
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.textSize = 20;
        this.sprite.collider = 'static';
        
        // animation part
        // this.sprite.pos = createVector((this.x*100)+100, (this.y*100)+320)
        // this.pos = createVector(x*100+100, y*100+320);
        // this.newpos = createVector(x*100+100, y*100+320);
    }
  
  
  
    /**
     * Function to update coordinates
     * 
     * @param {int} i New x coordinate
     * @param {int} j New y coordinate
     */
    update(i, j) {
        // animation part
        // set the lerp between current position and next one
        // this.newpos = createVector(i*100+100, j*100+320);
        
        this.x = i;
        this.y = j;
        
        this.sprite.pos.x = (i*100)+100;
        this.sprite.pos.y = (j*100)+320;
        
    }
    
    show(){
        //Colore del numero
        var textColor;      // TODO
        if(this.value == 2 || this.value == 4)
            textColor = "#747160";
        else if(this.value == 0)
            textColor = "#ccc0b4";
        else
            textColor = "white";
            
        this.sprite.color = valuesColors[this.value];
        this.sprite.textColor = textColor;
        this.sprite.text = this.value;
        
        this.sprite.draw();
  
        // animation part
        // if (this.value != 0) {
        //     this.pos = p5.Vector.lerp(this.pos, this.newpos, 0.35);
        // }
  
        // this.sprite.pos.x = this.pos.x;
        // this.sprite.pos.y = this.pos.y;
        
    }
  }