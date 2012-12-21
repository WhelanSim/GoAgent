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
            url = "http://goagent.growbers.com/model/property_getType.php?format=json";
            break;
          case 1:
            url = "http://goagent.growbers.com/model/news_getInfo.php?format=json&newstype";
            break;
          case 2:
            url = "http://goagent.growbers.com/model/property_getType.php?format=json&type=single family";
            break;
          case 3:
            url = "http://goagent.growbers.com/model/property_call.php?format=json";
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
            for (var k = 0, l = obj.items[i].links.length; k < l; k++) {
                Ti.API.warn(obj.items[i].links[k]);
                images.push(obj.items[i].links[k]);
            }
            item.images = images;
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
            item.id = obj.items[i].newsid;
            item.title = obj.items[i].title;
            item.desc = obj.items[i].description;
            item.dtime = obj.items[i].dtime;
            item.author = obj.items[i].author;
            item.newstype = obj.items[i].newstype;
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
    $.__views.__alloyId3 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "All Listing",
        id: "__alloyId3"
    }), "Window", null);
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "table"
    }), "TableView", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.table);
    $.__views.tab1 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId3,
        id: "tab1",
        title: "All Listing",
        icon: "KS_nav_ui.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab1);
    $.__views.__alloyId4 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Announcement",
        id: "__alloyId4"
    }), "Window", null);
    $.__views.announcementTable = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "announcementTable"
    }), "TableView", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.announcementTable);
    $.__views.tab2 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId4,
        id: "tab2",
        title: "Announcement",
        icon: "KS_nav_views.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab2);
    $.__views.__alloyId5 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Favourite",
        id: "__alloyId5"
    }), "Window", null);
    $.__views.__alloyId6 = A$(Ti.UI.createLabel({
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Favourite listing",
        id: "__alloyId6"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.tab3 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId5,
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
    Ti.App.addEventListener("app:tab1 open", function(e) {
        Ti.API.info(e);
        var win = Ti.UI.createWindow(), view = Ti.UI.createImageView({
            image: e.data
        });
        win.add(view);
        $.tab1.open(win);
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;