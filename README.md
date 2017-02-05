Time Search
=================

Search the weather record by time and StationID or longitude/latitude.

Features
-

* Create the filter of find command for MongoDB.

Installation
-

Install directly via NPM

```sh
$ npm install weather-taiwan-timesearch
```

Getting started
-

### Write the main application (app.js)
***
```sh
"use strict";
var TimeSearch = require('weather-taiwan-timesearch');

TimeSearch.StringByID(startTime, StationID, function(err, result) {
	console.log(result);
})
TimeSearch.StringByGeo(longitude, latitude, startTime, options, function(err, result) {
	console.log(result);
})
```
options is a Object for $near operator, currently only supports $maxDistance operator, the default value is 10000(meters), you can check the [mongodb website](https://docs.mongodb.com/manual/reference/operator/query/near/) for more info.

## more example
```sh
var config = {
	"databaseLocal": {
		"uri": "mongodb://localhost:27017/weatherTW",
		"collection": "weatherAll"
	}
}
TimeSearch.StringByID('2017-01-26T02:00:00.000Z', '466940', function(err, result) {
	console.log(result);
})
TimeSearch.StringByGeo(121.534327, 25.018597, '2017-02-04T21:00:00.000Z', {}, function(err, result) {
	console.log(result);
})
TimeSearch.StringByGeo(121.534327, 25.018597, '2017-02-04T21:00:00.000Z', {maxDistance: 10000}, function(err, result) {
	console.log(result);
})
TimeSearch.SearchByID(config.databaseLocal.uri, config.databaseLocal.collection, '2017-02-04T21:00:00.000Z', '466940', function(err, result) {
	console.log(result);
})
TimeSearch.Search(config.databaseLocal.uri, config.databaseLocal.collection, 121.534327, 25.018597, '2017-02-04T21:00:00.000Z', {maxDistance: 10000}, function(err, result) {
	console.log(result);
})
```

### Run the main application (app.js)

```sh
$ node app.js
```


License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2017 Wesley Tsai<<wesleyboy42@gmail.com>>
