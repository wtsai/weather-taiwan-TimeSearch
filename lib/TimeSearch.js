var moment = require('moment');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

module.exports = {
	Search: function(dburi, dbcollection, longitude, latitude, startTime, options, callback) {
		var geooptions = (options.hasOwnProperty("maxDistance")) ? options : {
			maxDistance: 10000
		};
		MongoClient.connect(dburi, function(connecterr, db) {
			if (connecterr) {
				throw connecterr;
			}
			var weatherAll = db.collection(dbcollection);

			var obsString = {
				"obsTime": {
					"$gte":new Date(moment(startTime).subtract(30, 'minutes').utc().format()),
					"$lt":new Date(moment(startTime).add(30, 'minutes').utc().format())
				}, "geometry": {
					"$near": {
						"$geometry": {
							"type": "Point",
							"coordinates": [
								longitude, latitude
							]
						},
						"$maxDistance": geooptions.maxDistance,
		        "num": 2
					}
				}
			};
			console.log(obsString);
			weatherAll.find(obsString).toArray(function(err, docs) {
				console.log(docs);
				if(docs.length > 0){
					//console.log(docs[0]);
					db.close();
					if (callback)
						callback(null, docs);
				}
				else{
					//console.log("No match records.");
					db.close();
					if (callback)
						callback(null, {});
				}
			});
		});
	},
	SearchByID: function(dburi, dbcollection, startTime, stationId, callback) {
		MongoClient.connect(dburi, function(connecterr, db) {
			if (connecterr) {
				throw connecterr;
			}
			var weatherAll = db.collection(dbcollection);

			var obsString = {"obsTime": {"$gte":new Date(moment(startTime).utc().format()), "$lt":new Date(moment(startTime).add(30, 'minutes').utc().format())}, "stationId": stationId};
			//console.log(obsString);
			weatherAll.find(obsString).toArray(function(err, docs) {
				if(docs.length > 0){
					//console.log(docs[0]);
					db.close();
					if (callback)
						callback(null, docs[0]);
				}
				else{
					//console.log("No match records.");
					db.close();
					if (callback)
						callback(null, {});
				}
			});
		});
	},
	StringByID: function(startTime, stationId, callback) {
		if (callback)
			callback(null, {"obsTime": {"$gte":new Date(moment(startTime).utc().format()), "$lt":new Date(moment(startTime).add(30, 'minutes').utc().format())}, "stationId": stationId});
	},
	StringByGeo: function(longitude, latitude, startTime, options, callback) {
		var geooptions = (options.hasOwnProperty("maxDistance")) ? options : {
			maxDistance: 10000
		};
		var obsString = {
			"obsTime": {
				"$gte":new Date(moment(startTime).subtract(30, 'minutes').utc().format()),
				"$lt":new Date(moment(startTime).add(30, 'minutes').utc().format())
			}, "geometry": {
				"$near": {
					"$geometry": {
						"type": "Point",
						"coordinates": [
							longitude, latitude
						]
					},
					"$maxDistance": geooptions.maxDistance,
					"num": 1
				}
			}
		};
		if (callback)
			callback(null, obsString);
	}
}
