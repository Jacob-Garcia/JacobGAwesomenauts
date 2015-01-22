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
    

    },
   // These lines update the player if he ever moves across the map.
    update: function(delta) {
       if (me.input.isKeyPressed("right")) {
        //adds to the position of the x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement smooth
       	this.body.vel.x += this.body.accel.x * me.timer.tick;
     // This else function is used if the key is NOT being pressed, in that case, the velocity is returned to zero, and no movement is involved.
       } else {
       	this.body.vel.x = 0;
       }

       this.body.update(delta);
       return true;
    }
});