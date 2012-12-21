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
		// case 0 = get_All_Listing,  case 1 = get_All_Announcement
		case 0: url = 'http://goagent.growbers.com/model/property_getType.php?format=json'; break;
		case 1: url = 'http://goagent.growbers.com/model/news_getInfo.php?format=json&newstype'; break;
		case 2: url = 'http://goagent.growbers.com/model/property_getType.php?format=json&type=single family'; break;
		case 3: url = 'http://goagent.growbers.com/model/property_call.php?format=json'; break;
		default: url = 'http://goagent.growbers.com/model/property_call.php?format=json'; break;
	}
	xhr.open('GET', url);
	xhr.send();
}

// the callback function to be invoked when reTrieveData onload is completed
// data handling
var tableData = [];
function display(_return){
	var obj = JSON.parse(_return);
	var data = [];
	for(var i=0,j=obj.items.length; i<j; i++){
		var item = {};
		item.id = obj.items[i].propertyid;
		item.name = obj.items[i].propertyname;
		item.price = obj.items[i].price;
		item.type = obj.items[i].ptype;
		item.room = obj.items[i].bedroom;
		item.desc = obj.items[i].description;
		item.thumbnail = obj.items[i].thumbnail; 
		item.lat = obj.items[i].geo_lat;
		item.lon = obj.items[i].geo_lon; 
		item.images = [];
		
		var images = [];
		for(var k=0, l=obj.items[i].links.length; k<l; k++){
			Ti.API.warn(obj.items[i].links[k]);
			images.push(obj.items[i].links[k]);
		}
		item.images = images;
		
		
		if(item.photo === null || item.photo === ''){
			item.photo = 'KS_nav_ui.png';
		}
		
		var row = Alloy.createController('row', item).getView();
		data.push(row); 
		tableData.push(item);
	}
	
	//read announcement
	retrieveData(handleAnnouncement, 1);
	$.table.setData(data);
}

var announcementData = [];
function handleAnnouncement(_return){
	Ti.API.info(_return);
	
	var obj = JSON.parse(_return);
	var data = [];
	for(var i=0,j=obj.items.length; i<j; i++){
		var item = {};
		item.id = obj.items[i].newsid;
		item.title = obj.items[i].title;
		item.desc = obj.items[i].description;
		item.dtime = obj.items[i].dtime;
		item.author = obj.items[i].author;
		item.newstype = obj.items[i].newstype; 

		var row = Alloy.createController('row_announce', item).getView();
		data.push(row); 
		announcementData.push(item);
	}
	$.announcementTable.setData(data);
	Ti.API.info('end');
}

if (OS_IOS) {
    $.table.on('swipe', function(e) {
        alert(e);
    });
    
    //open detail window
    $.table.on('click', function(e) {
    	var win = Alloy.createController('detailWindow', tableData[e.index]).getView();
    	$.tab1.open(win);
    });
}

// open a new window to show full screen photo
Ti.App.addEventListener('app:tab1 open', function(e){
	Ti.API.info(e);
	
	var win = Ti.UI.createWindow();
	var view = Ti.UI.createImageView({
		image:e.data
	});
	win.add(view);
	$.tab1.open(win);
});

$.index.open();
