game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
        // The levelDirector is called to load the test level.
        me.levelDirector.loadLevel("test");
        // These two lines are used to pull the Orc player entity from the entity pool in entities.js.
        var player = me.pool.pull("player", 0, 420, {});
        me.game.world.addChild(player, 5);
        // This inout is used to bind the right arrow key to move the character to the right.
        me.input.bindKey(me.input.KEY.RIGHT, "right");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
