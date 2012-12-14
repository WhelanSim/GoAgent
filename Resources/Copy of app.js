//require the UI components necessary to drive the test
var NavigationController = require('NavigationController').NavigationController;

//create NavigationController which will drive our simple application
var controller = new NavigationController();

//open initial window
var win1 = Ti.UI.createWindow({backgroundColor:'white', title:'First'});
controller.open(win1);

var table = Ti.UI.createTableView({
	data:[
		{title:"Semua"},
		{title:"Condo"},
		{title:"Single Family"},
		{title:"Other"},
		{title:"Tak tau"},
	]
});
win1.add(table);

var win2 = Ti.UI.createWindow({backgroundColor:'white', title:'Property List'});
table.addEventListener('click', function(e){
	Ti.API.info(e.index);
	retrieveData(display, e.index);
	controller.open(win2);
});

var propertyList = Ti.UI.createTableView({backgroundColor:'transparent',height:970,top:0});
win2.add(propertyList);

// retrieve JSON object example
function retrieveData(callback, selection){
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload = function(e){
		callback(this.responseText);
	};
	
	var url = '';
	switch(selection){
		case 0: url = 'http://goagent.growbers.com/model/property_call.php?format=json'; break;
		case 1: url = 'http://goagent.growbers.com/model/property_call.php?format=json&type=condo'; break;
	}
	xhr.open('GET', url);
	xhr.send();
}

// the callback function to be invoked when reTrieveData onload is completed
// data handling
function display(_return){
	Ti.API.info(_return);
	
	var obj = JSON.parse(_return);
	//Ti.API.info(obj.items[0].item.propertyname);
	
	var data = [];
	for(var i=0,j=obj.items.length; i<j; i++){
		var item = {};
		item.id = obj.items[i].item.propertyid;
		item.name = obj.items[i].item.propertyname;
		item.price = obj.items[i].item.price;
		item.type = obj.items[i].item.type;
		item.bedroom = obj.items[i].item.bedroom;
		item.description = obj.items[i].item.description;
		item.photo = obj.items[i].item.photo; 
		
		if(item.photo === null || item.photo === ''){
			item.photo = 'KS_nav_ui.png';
		}
		
		data.push(item); 
	}
	
	//Ti.API.warn(data.length);
	Ti.App.fireEvent('App:updateTable', {data:data});
}

Ti.App.addEventListener('App:updateTable', function(e){
	updatePropertyList(e.data);	
});

function updatePropertyList(data){
	var tableData =[];
	Ti.API.info(data.length);
	
	// we have to manually design for each role. Manually put the image, its position, text etc
	for(var i = 0, l = data.length; i < l; i++) {
		var row = Ti.UI.createTableViewRow();
		
		// set the image
		//var img = Ti.UI.createImageView({image:data[i].photo,width:82,height:82,left:5,top:0});
		//row.add(img);
		
		// property field
		var name = Ti.UI.createLabel({text:'Name   : '+data[i].name,textAlign:'left',font:{fontSize:15, fontWeight:'bold'},width:500,color:'black',top:15,left:100,height:20});
		var description = Ti.UI.createLabel({text:'Price  : '+ (data[i].price).toString(),textAlign:'left',font:{fontSize:12},width:300,color:'black',top:30,left:100,height:40});
		var type = Ti.UI.createLabel({text:'Type    : '+data[i].type,textAlign:'left',font:{fontSize:12},width:300,color:'black',top:45,left:100,height:40});
		var bedroom = Ti.UI.createLabel({text:'Bedroom: '+data[i].bedroom,textAlign:'left',font:{fontSize:12},width:300,color:'black',top:60,left:100,height:40});
		var desc = Ti.UI.createLabel({text:'Info    : '+data[i].description,textAlign:'left',font:{fontSize:12},width:300,color:'black',top:75,left:100,height:40});
		
		// add those customized data to row
		row.add(name);
		row.add(description);
		row.add(type);
		row.add(bedroom);
		row.add(desc);
		row.height = 120;
		row.className = "property_row";
		
		// after set up the row, push it into data
		tableData.push(row);
	};
	
	propertyList.setData(tableData);
}
