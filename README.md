Time Search
=================

Search the weather record by time and StationID.

Getting started
-

### Write the main application (app.js)
***
```sh
"use strict";
var TimeSearch = require('./lib/TimeSearch');

var config = {
	"databaseLocal": {
		"uri": "mongodb://localhost:27017/weatherTW",
		"collection": "weatherAll"
	}
}

TimeSearch.Search(config.databaseLocal.uri, config.databaseLocal.collection, '2017-01-26T02:00:00.000Z', '466940', function(err, result) {
	console.log(result);
})
TimeSearch.obsString('2017-01-26T02:00:00.000Z', '466940', function(err, result) {
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
