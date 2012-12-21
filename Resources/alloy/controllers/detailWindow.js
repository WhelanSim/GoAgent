function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.detailWin = A$(Ti.UI.createWindow({
        backgroundImage: "Pic/768_1024BG.jpg",
        title: "Whelan is here :)",
        id: "detailWin"
    }), "Window", null);
    $.addTopLevelView($.__views.detailWin);
    var __alloyId0 = [];
    $.__views.scrollableView = A$(Ti.UI.createScrollableView({
        top: 0,
        width: 768,
        height: 288,
        views: __alloyId0,
        id: "scrollableView",
        showPagingControl: "true"
    }), "ScrollableView", $.__views.detailWin);
    $.__views.detailWin.add($.__views.scrollableView);
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
    var __alloyId1 = [];
    $.__views.mapView = A$(Ti.Map.createView({
        top: 20,
        left: 5,
        width: 500,
        height: 500,
        mapType: Ti.Map.STANDARD_TYPE,
        region: {
            latitude: 3.13802,
            longitude: 101.620777,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        },
        animate: !0,
        regionFit: !0,
        userLocation: !0,
        annotations: __alloyId1,
        ns: "Ti.Map",
        id: "mapView"
    }), "View", $.__views.scrollView);
    $.__views.scrollView.add($.__views.mapView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.detailWin.title = args.name || "";
    $.name.text = args.name || "";
    $.desc.text = args.desc || "";
    $.location.text = "LOCATION";
    $.feature.text = "FEATURES\n- " + args.price + "\n- " + args.room + "\n- " + args.type;
    var views = [];
    Ti.API.info(args.images);
    for (var i = 0, j = args.images.length; i < j; i++) {
        var view = Ti.UI.createImageView({
            image: args.images[i]
        });
        views.push(view);
    }
    $.scrollableView.views = views;
    $.scrollableView.on("singletap", function(e) {
        var a = args.images[$.scrollableView.currentPage];
        Ti.App.fireEvent("app:tab1 open", {
            data: a,
            index: $.scrollableView.currentPage
        });
    });
    var annotation = Ti.Map.createAnnotation({
        latitude: args.lat,
        longitude: args.lon,
        title: args.name,
        subtitle: args.type,
        animate: !0,
        myid: 0,
        image: "Pic/krr_map_dropin.png",
        rightButton: "Pic/startbutton.png"
    });
    $.mapView.region = {
        latitude: args.lat,
        longitude: args.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    };
    $.mapView.addAnnotation(annotation);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;