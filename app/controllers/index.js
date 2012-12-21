retrieveData(display, 0);

// retrieve JSON object example
function retrieveData(callback, selection){
	Ti.API.info('retrieve:'+selection);
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload = function(e){
		callback(this.responseText);
	};

	var url = '';
	switch(selection){
		case 0: url = 'http://goagent.growbers.com/model/property_call.php?format=json'; break;
		case 1: url = 'http://goagent.growbers.com/model/property_getType.php?format=json&type=condo'; break;
		case 2: url = 'http://goagent.growbers.com/model/property_getType.php?format=json&type=single family'; break;
		case 4: url = 'http://goagent.growbers.com/model/property_getType.php?format=json&bedroom=1'; break;
		default: url = 'http://goagent.growbers.com/model/property_call.php?format=json'; break;
	}
	xhr.open('GET', url);
	xhr.send();
}

// the callback function to be invoked when reTrieveData onload is completed
// data handling
var tableData = [];
function display(_return){
	Ti.API.info(_return);
	
	var obj = JSON.parse(_return);
	var data = [];
	for(var i=0,j=obj.items.length; i<j; i++){
		var item = {};
		item.id = obj.items[i].item.propertyid;
		item.name = obj.items[i].item.propertyname;
		item.price = obj.items[i].item.price;
		item.type = obj.items[i].item.type;
		item.room = obj.items[i].item.bedroom;
		item.desc = obj.items[i].item.description;
		item.photo = obj.items[i].item.photo; 
		item.lat = obj.items[i].item.geo_lat;
		item.lon = obj.items[i].item.geo_lon; 
		
		if(item.photo === null || item.photo === ''){
			item.photo = 'KS_nav_ui.png';
		}
		
		var row = Alloy.createController('row', item).getView();
		data.push(row); 
		tableData.push(item);
	}
	
	$.table.setData(data);
}

if (OS_IOS) {
    $.table.on('swipe', function(e) {
        alert(e);
    });
    
    $.table.on('click', function(e) {
    	var win = Alloy.createController('detailWindow', tableData[e.index]).getView();
    	$.tab1.open(win);
    });
}
$.index.open();
