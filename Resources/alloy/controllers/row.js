function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        className: "property_row",
        height: 163,
        backgroundColor: "transparent",
        backgroundImage: "Pic/listing_bg.png",
        backgroundSelectedImage: "Pic/listing_bg_selected.png",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.thumbnail = A$(Ti.UI.createImageView({
        width: "82dp",
        height: "82dp",
        left: "5dp",
        top: 0,
        id: "thumbnail"
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.thumbnail);
    $.__views.__alloyId6 = A$(Ti.UI.createView({
        id: "__alloyId6"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.__alloyId6);
    $.__views.name = A$(Ti.UI.createLabel({
        color: "white",
        height: 20,
        width: 500,
        text: "Name   : ",
        textAlign: "left",
        top: 15,
        left: 100,
        font: {
            fontSize: 15,
            fontWeight: "bold"
        },
        id: "name"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.name);
    $.__views.price = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "Price  : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 30,
        left: 100,
        id: "price"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.price);
    $.__views.type = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "Type    : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 45,
        left: 100,
        id: "type"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.type);
    $.__views.room = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "Bedroom: ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 60,
        left: 100,
        id: "room"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.room);
    $.__views.desc = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "Info    : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 75,
        left: 100,
        id: "desc"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.desc);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.thumbnail.image = args.photo || "";
    $.name.text = args.name || "";
    $.price.text = args.price || "";
    $.type.text = args.newstype || "";
    $.desc.text = args.desc || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;