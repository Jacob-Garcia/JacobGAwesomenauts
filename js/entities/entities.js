// This is the code for the Orc player
game.PlayerEntity = me.Entity.extend ({
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
    // Keeps track of which direction your player goes
    this.facing = "right";
    // Used to make the camera follow the player as he moves
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    // These two lines add aniamtions for the Orc player from the spritesheet he is given in the data file. The numbers represent the different sprites used to imitate a walking animation.
    this.renderable.addAnimation("idle", [78]);
    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 123, 124, 125], 80);
    this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
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
       	this.facing = "right";
       	this.flipX(true);
     // This else function is used if the key is NOT being pressed, in that case, the velocity is returned to zero, and no movement is involved.
     // The else if states whether to move the character left or not
       } else if (me.input.isKeyPressed("left")) {
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.facing = "left";
        this.flipX(false);
       } else {
       	this.body.vel.x = 0;
       }
      // This if statement allows jumping and falling, albeit it being too floaty right now
        if(me.input.isKeyPressed("space") && !this.jumping && !this.falling) {
        	this.jumping = true;
        	this.body.vel.y -= this.body.accel.y * me.timer.tick;
        };


        if(me.input.isKeyPressed("attack")) {
          if(!this.renderable.isCurrentAnimation("attack"));
          this.renderable.setCurrentAnimation("attack", "idle");
          this.renderable.setAnimationFrame();
        }
    }
       // These if and else statements declare when to use the "walk" and "idle" animations when the character is either moving or not.
       else if(this.body.vel.x !==0 && !this.renderable.isCurrentAnimation("attack")) {
       if(!this.renderable.isCurrentAnimation("walk")) {
       	   this.renderable.setCurrentAnimation("walk");
          }
      } else if(!this.renderable.isCurrentAnimation("attack")) {
      	this.renderable.setCurrentAnimation("idle");
      }        

    }
     me.collision.check(this, true, this.collideHandler.bind(this), true);
     this.body.update(delta);


      this._super(me.Entity, "update", [delta]);
      return true;
    },

    collideHandler: function(response) {
    	if(response.b.type==='EnemyBaseEntity') {
    		var ydif = this.pos.y - response.b.pos.y;
    		var xdif = this.pos.x - response.b.pos.x;


        if(ydif<-40 && xdif< 70 && xdif>-35) {
             this.body.falling = false;
             this.body.vel.y = -1;
          }
          else if(xdif>-35 && this.facing==='right' && (xdif<0)) {
    			this.body.vel.x = 0;
    			this.pos.x = this.pos.x -1;
          }
          else if(xdif<70 && this.facing==='left' && (xdif>0) {
                this.body.vel.x = 0;
                this.pos.x = this.pos.x +1;
          }

          if (this.renderable.isCurrentAnimation("attack")) {
            response.b.loseHealth();
          }
    		}
    	}
    }
});

// These two globs of text contain the data of the two towers in the game, for player and the enemy.
game.PlayerBaseEntity = me.Entity.extend({
     init: function(x, y, settings) {
     	// These variables state the height and width of the sprite.
       this._super(me.Entity, 'init', [x, y, {
              image: "tower",
              width: 100,
              height: 100,
              spritewidth: "100",
              spriteheight: "100",
              getShape: function() {
              	return (new me.Rect(0, 0, 100, 70)).toPolygon();
              }
       }]);
       // Functions for when if and when the tower is broken, when the health is equal to zero, and the type states it as the player base. 
       this.broken = false;
       this.health = 10;
       this.alwaysUpdate = true;
       this.body.onCollision = this.onCollision.bind(this);
       console.log("init");
       // Animations for the towers, same as the Enemy Base. Each one ("broken" and "idle") is used to state whether the tower is almost destroyed or fine.
       this.type = "PlayerBase";
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       this.renderable.setCurrentAnimation("idle");

     },
     // Updating functions for when the health of the tower is zero
     update:function(delta) {
         if(this.health<=0) {
         	this.broken = true;
         	this.renderable.setCurrentAnimation("broken");
         }
         this.body.update(delta);

         this._super(me.Entity, "update", [delta]);
         return true;
     },

     loseHealth: function(damage) {
         this.health = this.health - damage;
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
              	return (new me.Rect(0, 0 , 100, 70)).toPolygon();
              }
       }]);
       this.broken = false;
       this.health = 10;
       this.alwaysUpdate = true;
       this.body.onCollision = this.onCollision.bind(this);
       console.log("init");
       this.type = "EnemyBaseEntity";

       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       this.renderable.setCurrentAnimation("idle");
       this.flipX(true);

     },
     
     update:function(delta) {
         if(this.health<=0) {
         	this.broken = true;
         	this.renderable.setCurrentAnimation("broken");
         }
         this.body.update(delta);

         this._super(me.Entity, "update", [delta]);
         return true;
     },
     onCollision: function() {
     	
     },

     loseHealth: function() {
      this.health--;
     }
});

game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
      this._super(me.Entity, 'init', [x, y, {
             image: "creep1",
             width: 32,
             height: 64,
             spritewidth: "32", 
             spriteheight: "64",
             getShape: function() {
             return (new me.Rect(0,0,32,64)).toPolygon();
             } 
      }]);
      this.health = 10;
      this.alwaysUpdate = true;
      this.attacking = false;
      this.lastAttacking = new Date().getTime();
      this.lastHit = new Date().getTime();
      this.now = new Date().getTime();
      this.body.setVelocity(3, 20);

      this.type = "EnemyCreep";

      this.renderable.addAnimation("walk", [3, 4, 5], 80);
      this.renderable.setCurrentAnimation("walk");
  
    },

    update: function(delta){
              this.now = new Date().getTime();
              this.body.vel.x -= this.body.accel.x * me.timer.tick;
              me.collision.check(this, true, this.collideHandler.bind(this), true);
              this.body.update(delta);
              this._super(me.Entity, "update", [delta]);
              return true;
    },

    collideHandler: function(response) {
         if (response.b.type=== 'PlayerBase') {
            this.attacking=true;
            this.lastAttacking=this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= 1000)) {
              this.lastHit = this.now;
              response.b.loseHealth(1);
            }
         } else if (response.b.type==='PlayerEntity') {

         }
    }
});

game.GameManager = Object.extend({
  init: function(x, y, settings) {
       this.now = new Date().getTime();
       this.lastCreep = new Date().getTime();

       this.alwaysUpdate = true;
       console.log("init game manager");
  },

  update: function() {
     this.now = new Date().getTime();


     if (Math.round(this.now/1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
        console.log("creating creep");
        this.lastCreep = this.now;
        var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
        me.game.world.addChild(creep, 5);
     }
     return true;
  }
});