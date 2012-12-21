var args = arguments[0] || {};
$.detailWin.title = args.name || '';
//$.img.image = args.photo || '';
$.name.text = args.name || '';
$.desc.text = args.desc ||'';
$.location.text = 'LOCATION';
$.feature.text = 'FEATURES' + '\n- ' + args.price +'\n- '+ args.room + '\n- ' + args.type;

// ----------------- Populate Scrollable View with Picture ------------------- //
var views = [];
views.push(Ti.UI.createView({backgroundImage:args.photo||''}));
for(var i=0, j=3; i<j; i++){
	var view = Ti.UI.createView({ backgroundColor:'#123' });	
	views.push(view);
}
$.scrollableView.views = views;

$.scrollableView.on('singletap', function(e){
	Ti.API.info($.scrollableView.currentPage);
	var a = args.photo;
	Ti.App.fireEvent('app:tab1 open', {data:a});
})
// ----------------- END of Populate Scrollable View with Picture ------------------- //


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