var args = arguments[0] || {};
$.detailWin.title = args.name || '';
$.img.image = args.photo || '';
$.name.text = args.name || '';
$.desc.text = args.desc ||'';
$.location.text = 'LOCATION';
$.feature.text = 'FEATURES' + '\n- ' + args.price +'\n- '+ args.room + '\n- ' + args.type;
