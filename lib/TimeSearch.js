var moment = require('moment');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

module.exports = {
	Search: function(dburi, dbcollection, startTime, stationId, callback) {
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
	obsString: function(startTime, stationId, callback) {
		if (callback)
			callback(null, {"obsTime": {"$gte":new Date(moment(startTime).utc().format()), "$lt":new Date(moment(startTime).add(30, 'minutes').utc().format())}, "stationId": stationId});
	}
}
