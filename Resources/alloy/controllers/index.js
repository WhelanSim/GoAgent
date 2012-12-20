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
            url = "http://goagent.growbers.com/model/property_getType.php?format=json&type=condo";
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
        Ti.API.info(_return);
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
            if (item.photo === null || item.photo === "") item.photo = "KS_nav_ui.png";
            var row = Alloy.createController("row", item).getView();
            data.push(row);
            tableData.push(item);
        }
        $.table.setData(data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        id: "index"
    }), "TabGroup", null);
    $.__views.__alloyId1 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "All Listing",
        id: "__alloyId1"
    }), "Window", null);
    var __alloyId2 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "table",
        onclick: "doClick"
    }), "TableView", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.table);
    $.__views.tab1 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId1,
        id: "tab1",
        title: "All Listing",
        icon: "KS_nav_ui.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab1);
    $.__views.__alloyId5 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Announcement",
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
        text: "I am Window 2",
        id: "__alloyId6"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId4 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Announcement",
        icon: "KS_nav_views.png",
        id: "__alloyId4"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId4);
    $.__views.__alloyId8 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Favourite",
        id: "__alloyId8"
    }), "Window", null);
    $.__views.__alloyId9 = A$(Ti.UI.createLabel({
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Favourite listing",
        id: "__alloyId9"
    }), "Label", $.__views.__alloyId8);
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId7 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Favourite",
        icon: "KS_nav_views.png",
        id: "__alloyId7"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId7);
    $.addTopLevelView($.__views.index);
    _.extend($, $.__views);
    retrieveData(display, 0);
    var tableData = [];
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