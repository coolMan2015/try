// 

var folder = 'BuouMall';

// 对应的html，browserify路径
var projectPathList = {
	customDetails: [["js/app/customDetails.js"], "customDetails.js"]
}







//////////////////////////////////////////////////////////////////////////////////////////////////////////
var path = require('path');
// var baseFolder = path.resolve(__dirname, folder) + '/';

// module.exports = function(){
// 	var obj = projectPathList;
	
// 	for(var i in obj){
// 		var item = obj[i];
// 		if(item[0] instanceof Array){
// 			for(var j=0;j<item[0].length;j++){
// 				item[0][j] = baseFolder +item[0][j];
// 			}
// 		}else{
// 			item[0] = [].push(item[0]);
// 		}

// 		item[2] = baseFolder + item[2];
// 	}
// 	return obj;
// }()

var baseFolder = './' +folder+ '/';
module.exports = function(){
	var obj = projectPathList;
	
	for(var i in obj){
		var item = obj[i];
		if(item[0] instanceof Array){
			for(var j=0;j<item[0].length;j++){
				item[0][j] = baseFolder +item[0][j];
			}
		}else{
			item[0] = [].push(item[0]);
		}

	}
	return obj;
}()