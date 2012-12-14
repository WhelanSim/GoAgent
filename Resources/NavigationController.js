exports.NavigationController = function() {
	this.windowStack = [];
};

exports.NavigationController.prototype.open = function(/*Ti.UI.Window*/windowToOpen,animBool) {
	//add the window to the stack of windows managed by the controller
	this.windowStack.push(windowToOpen);
	//Ti.API.info(windowToOpen.id + ''+ this.windowStack);

	//grab a copy of the current nav controller for use in the callback
	var that = this;
	windowToOpen.addEventListener('close', function() {
		that.windowStack.pop();
	});
	
	//hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
	windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;

	//This is the first window
	if(this.windowStack.length === 1) {
		if(Ti.Platform.osname === 'android') {
			windowToOpen.exitOnClose = true;
			windowToOpen.open();
		} else {
			windowToOpen.leftNavButton = null;
			this.navGroup = Ti.UI.iPhone.createNavigationGroup({
				window : windowToOpen
			});
			var containerWindow = Ti.UI.createWindow();
			containerWindow.add(this.navGroup);
			containerWindow.open();
		}
	}
	//All subsequent windows
	else {
		if(Ti.Platform.osname === 'android') {
			windowToOpen.open();
		} else {
			this.navGroup.open(windowToOpen,{animated:true});
		}
	}
};

//animBool : a boolean to indicate whether want animation or not
exports.NavigationController.prototype.close = function(/*Ti.UI.Window*/windowToOpen) {
	this.navGroup.close(windowToOpen,{animated:false});		
}

//go back to the initial window of the NavigationController
exports.NavigationController.prototype.home = function() {
	//Ti.API.info('go home');
	//store a copy of all the current windows on the stack
	var windows = this.windowStack.concat([]);
	for(var i = 1, l = windows.length; i < l; i++) {
		// if detect this.navGroup, means is iphone, seperate from android close function
		(this.navGroup) ? this.navGroup.close(windows[i],{animated:false}) : windows[i].close();
	}
	
	this.windowStack = [this.windowStack[0]]; //reset stack
	//Ti.API.info(this.windowStack);
};
