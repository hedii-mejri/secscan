// var evilscan = require('evilscan');
var secscan = require('../');
var fs = require('fs');

var tab = [];

var stream = fs.createWriteStream('./files/output.json', {
	flags: 'w'
});

var options = {
    target : '8.8.8.8',

    //target  :'192.168.2.0/24',
    // target  :'192.168.1.1-192.168.1.5',
    port    :'1,5,7,18,20-30,37,42,43,49,53,69,70,79,80,103,110,115,118,137,139,143,150,156,161,179,190,194,197,389,396,443,445,546,547,8080,3000,9999',
    status  : 'TROU', // Timeout, Refused, Open, Unreachable
    concurrency : 1000,
    geo	    : false,
    timeout : 750,
    reverse : true
};

var scanner = new secscan(options);

scanner.on('result',function (data) {
    console.log(data);
    tab.push(JSON.stringify(data) + "\n");
});

scanner.on('error',function (err) {
	throw new Error(data.toString());
});

scanner.on('done',function () {
    stream.write('{ \n "elements" : \n [ \n ');

    for (var index = 0; index < tab.length; index++) {
        var element = tab[index];
        
        if(index < tab.length - 1 )
        {
            stream.write(element + ', \n');
        }
        else 
        {
            stream.write(element + '\n');
        }
    }
    stream.write(' \n ] \n }');
	stream.end();
});

scanner.run();
