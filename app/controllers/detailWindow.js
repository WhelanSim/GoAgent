var args = arguments[0] || {};
$.detailWin.title = args.name || '';
$.img.image = args.photo || '';
$.name.text = args.name || '';
$.desc.text = args.desc ||'';
$.location.text = 'LOCATION';
$.feature.text = 'FEATURES' + '\n- ' + args.price +'\n- '+ args.room + '\n- ' + args.type;

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