// This is the code for the Orc player
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
        	image: "player",
        	width: 64,
        	height: 64,
        	spritewidth: "64",
        	spriteheight: "64",
        	getShape: function() {
        		return(new me.Rect(0, 0, 64, 64)).toPolygon();
        	}
        }]);
    // Used for movement, this line sets the velocity in which the palyer moves across the map.
    this.body.setVelocity(5, 20);
    // These two lines add aniamtions for the Orc player from the spritesheet he is given in the data file. The numbers represent the different sprites used to imitate a walking animation.
    this.renderable.addAnimation("idle", [78]);
    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 123, 124, 125], 80);
    // This action sets the current animation to "idle" when the player is NOT moving.
    this.renderable.setCurrentAnimation("idle");
    

    },
   // These lines update the player if he ever moves across the map.
    update: function(delta) {
       if (me.input.isKeyPressed("right")) {
        //adds to the position of the x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement smooth
       	this.body.vel.x += this.body.accel.x * me.timer.tick;
       	this.flipX(true);
     // This else function is used if the key is NOT being pressed, in that case, the velocity is returned to zero, and no movement is involved.
       } else {
       	this.body.vel.x = 0;
       }
       // These if and else statements declare when to use the "walk" and "idle" animations when the character is either moving or not.
       if(this.body.vel.x !== 0) {
       if(!this.renderable.isCurrentAnimation("walk")) {
       	   this.renderable.setCurrentAnimation("walk");
        }
      } else{
      	this.renderable.setCurrentAnimation("idle");
      }
       this.body.update(delta);

       this._super(me.Entity, "update", [delta]);
       return true;
    }
});

// These two globs of text contain the data of the two towers in the game, for player and the enemy.
game.PlayerBaseEntity = me.Entity.extend({
     init: function(x, y, settings) {
     	// These variabls state the height and width of the sprite.
       this._super(me.Entity, 'init', [x, y, {
              image: "tower",
              width: 100,
              height: 100,
              spritewidth: "100",
              spriteheight: "100",
              getShape: function() {
              	return (new me.Rect(0, 0, 100, 100)).toPolygon();
              }
       }]);
       // Functions for when if and when the tower is broken, when the health is equal to zero, and the type states it as the player base. 
       this.broken = false;
       this.health = 10;
       this.alwaysUpdate = true;
       this.body.onCollision = this.onCollision.bind(this);

       this.type = "PlayerBaseEntity";

     },
     
     update:function(delta) {
         if(this.health<=0) {
         	this.broken = true;
         }
         this.body.update(delta);

         this._super(me.Entity, "update", [delta]);
         return true;
     },
     onCollision: function() {

     }
});
// Same thing as the Player Base entity
game.EnemyBaseEntity = me.Entity.extend({
     init: function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y, {
              image: "tower",
              width: 100,
              height: 100,
              spritewidth: "100",
              spriteheight: "100",
              getShape: function() {
              	return (new me.Rect(0, 0 , 100, 100)).toPolygon();
              }
       }]);
       this.broken = false;
       this.health = 10;
       this.alwaysUpdate = true;
       this.body.onCollision = this.onCollision.bind(this);

       this.type = "EnemyBaseEntity";

     },
     
     update:function(delta) {
         if(this.health<=0) {
         	this.broken = true;
         }
         this.body.update(delta);

         this._super(me.Entity, "update", [delta]);
         return true;
     },
     onCollision: function() {
     	
     }
});