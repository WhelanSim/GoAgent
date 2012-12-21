function Controller() {
    function retrieveData(callback, selection) {
        Ti.API.info("retrieve:" + selection);
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function(e) {
            callback(this.responseText);
        };
        var url = "";
        switch (selection) {
          case 0:
            url = "http://goagent.growbers.com/model/property_call.php?format=json";
            break;
          case 1:
            url = "http://goagent.growbers.com/model/news_getInfo.php?format=json&newstype";
            break;
          case 2:
            url = "http://goagent.growbers.com/model/property_getType.php?format=json&type=single family";
            break;
          case 4:
            url = "http://goagent.growbers.com/model/property_getType.php?format=json&bedroom=1";
            break;
          default:
            url = "http://goagent.growbers.com/model/property_call.php?format=json";
        }
        xhr.open("GET", url);
        xhr.send();
    }
    function display(_return) {
        var obj = JSON.parse(_return), data = [];
        for (var i = 0, j = obj.items.length; i < j; i++) {
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
            if (item.photo === null || item.photo === "") item.photo = "KS_nav_ui.png";
            var row = Alloy.createController("row", item).getView();
            data.push(row);
            tableData.push(item);
        }
        retrieveData(handleAnnouncement, 1);
        $.table.setData(data);
    }
    function handleAnnouncement(_return) {
        Ti.API.info(_return);
        var obj = JSON.parse(_return), data = [];
        for (var i = 0, j = obj.items.length; i < j; i++) {
            var item = {};
            item.id = obj.items[i].item.newsid;
            item.title = obj.items[i].item.title;
            item.desc = obj.items[i].item.description;
            item.dtime = obj.items[i].item.dtime;
            item.author = obj.items[i].item.author;
            item.newstype = obj.items[i].item.newstype;
            var row = Alloy.createController("row_announce", item).getView();
            data.push(row);
            announcementData.push(item);
        }
        $.announcementTable.setData(data);
        Ti.API.info("end");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        id: "index"
    }), "TabGroup", null);
    $.__views.__alloyId2 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "All Listing",
        id: "__alloyId2"
    }), "Window", null);
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "table"
    }), "TableView", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.table);
    $.__views.tab1 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId2,
        id: "tab1",
        title: "All Listing",
        icon: "KS_nav_ui.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab1);
    $.__views.__alloyId3 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Announcement",
        id: "__alloyId3"
    }), "Window", null);
    $.__views.announcementTable = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "announcementTable"
    }), "TableView", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.announcementTable);
    $.__views.tab2 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId3,
        id: "tab2",
        title: "Announcement",
        icon: "KS_nav_views.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab2);
    $.__views.__alloyId4 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Favourite",
        id: "__alloyId4"
    }), "Window", null);
    $.__views.__alloyId5 = A$(Ti.UI.createLabel({
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Favourite listing",
        id: "__alloyId5"
    }), "Label", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.tab3 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId4,
        id: "tab3",
        title: "Favourite",
        icon: "KS_nav_views.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab3);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    retrieveData(display, 0);
    var tableData = [], announcementData = [];
    $.table.on("swipe", function(e) {
        alert(e);
    });
    $.table.on("click", function(e) {
        var win = Alloy.createController("detailWindow", tableData[e.index]).getView();
        $.tab1.open(win);
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;