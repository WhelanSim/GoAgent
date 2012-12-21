var args = arguments[0] || {};
$.detailWin.title = args.name || '';
$.name.text = args.name || '';
$.desc.text = args.desc ||'';
$.location.text = 'LOCATION';
$.feature.text = 'FEATURES' + '\n- ' + args.price +'\n- '+ args.room + '\n- ' + args.type;

// ----------------- Populate Scrollable View with Multiple Photos ------------------- //
var views = [];
Ti.API.info(args.images);
for(var i=0, j=args.images.length; i<j; i++){
	var view = Ti.UI.createImageView({image:args.images[i]});
	views.push(view);
}
$.scrollableView.views = views;

// tap to open full screen
$.scrollableView.on('singletap', function(e){
	var a = args.images[$.scrollableView.currentPage];
	Ti.App.fireEvent('app:tab1 open', {data:a, index:$.scrollableView.currentPage});
})
// ----------------- END of Populate Scrollable View with multiple photos ------------------- //


// ----------------- Set up google map & annotation ------------------- //
var annotation = Ti.Map.createAnnotation({
	latitude:args.lat,
	longitude:args.lon,
	title:args.name,
	subtitle:args.type,
	animate:true,
	myid:0,
	image:'Pic/krr_map_dropin.png',
	rightButton:'Pic/startbutton.png'
});

$.mapView.region = {
	latitude:args.lat,
	longitude:args.lon,
	latitudeDelta:0.01,
	longitudeDelta:0.01
};
		
$.mapView.addAnnotation(annotation);
// ----------------- END of Set up google map & annotation ------------------- //