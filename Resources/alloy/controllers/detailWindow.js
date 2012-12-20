function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {};
    $.__views.detailWin = A$(Ti.UI.createWindow({
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Whelan is here :)",
        id: "detailWin"
    }), "Window", null);
    $.addTopLevelView($.__views.detailWin);
    $.__views.img = A$(Ti.UI.createImageView({
        top: 0,
        width: 768,
        height: 288,
        id: "img"
    }), "ImageView", $.__views.detailWin);
    $.__views.detailWin.add($.__views.img);
    $.__views.scrollView = A$(Ti.UI.createScrollView({
        width: 768,
        height: Ti.UI.SIZE,
        top: 300,
        id: "scrollView",
        layout: "vertical"
    }), "ScrollView", $.__views.detailWin);
    $.__views.detailWin.add($.__views.scrollView);
    $.__views.name = A$(Ti.UI.createLabel({
        color: "white",
        height: 20,
        width: 748,
        top: 10,
        left: 5,
        font: {
            fontWeight: "bold"
        },
        id: "name"
    }), "Label", $.__views.scrollView);
    $.__views.scrollView.add($.__views.name);
    $.__views.desc = A$(Ti.UI.createLabel({
        color: "white",
        height: Ti.UI.SIZE,
        width: 748,
        top: 10,
        left: 5,
        id: "desc"
    }), "Label", $.__views.scrollView);
    $.__views.scrollView.add($.__views.desc);
    $.__views.feature = A$(Ti.UI.createLabel({
        color: "white",
        height: Ti.UI.SIZE,
        width: 748,
        top: 10,
        left: 5,
        font: {
            fontWeight: "bold"
        },
        id: "feature"
    }), "Label", $.__views.scrollView);
    $.__views.scrollView.add($.__views.feature);
    $.__views.location = A$(Ti.UI.createLabel({
        color: "white",
        height: 20,
        width: 200,
        top: 20,
        left: 5,
        font: {
            fontWeight: "bold"
        },
        id: "location"
    }), "Label", $.__views.scrollView);
    $.__views.scrollView.add($.__views.location);
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.detailWin.title = args.name || "";
    $.img.image = args.photo || "";
    $.name.text = args.name || "";
    $.desc.text = args.desc || "";
    $.location.text = "LOCATION";
    $.feature.text = "FEATURES\n- " + args.price + "\n- " + args.room + "\n- " + args.type;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;