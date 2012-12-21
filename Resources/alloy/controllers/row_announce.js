function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row_announce = A$(Ti.UI.createTableViewRow({
        className: "announce_row",
        height: 163,
        backgroundColor: "transparent",
        backgroundImage: "Pic/listing_bg.png",
        backgroundSelectedImage: "Pic/listing_bg_selected.png",
        id: "row_announce"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row_announce);
    $.__views.__alloyId7 = A$(Ti.UI.createView({
        id: "__alloyId7"
    }), "View", $.__views.row_announce);
    $.__views.row_announce.add($.__views.__alloyId7);
    $.__views.title = A$(Ti.UI.createLabel({
        color: "white",
        height: 20,
        width: 500,
        text: "Title   : ",
        textAlign: "left",
        top: 15,
        left: 100,
        font: {
            fontSize: 15,
            fontWeight: "bold"
        },
        id: "title"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.title);
    $.__views.desc = A$(Ti.UI.createLabel({
        color: "white",
        height: Ti.UI.SIZE,
        width: 300,
        text: "Info    : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 85,
        left: 100,
        id: "desc"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.desc);
    $.__views.dtime = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "dtime  : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 30,
        left: 100,
        id: "dtime"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.dtime);
    $.__views.author = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "Author    : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 45,
        left: 100,
        id: "author"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.author);
    $.__views.newstype = A$(Ti.UI.createLabel({
        color: "white",
        height: 40,
        width: 300,
        text: "Newstype    : ",
        textAlign: "left",
        font: {
            fontSize: 12
        },
        top: 55,
        left: 100,
        id: "newstype"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.newstype);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.title || "";
    $.dtime.text = args.dtime || "";
    $.author.text = args.author || "";
    $.newstype.text = args.newstype || "";
    $.desc.text = args.desc || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;