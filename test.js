/**
 * Created by daniel.irwin on 5/24/16.
 */

describe('cucumber-report-store', function(){
    it('doesnt explode', function() {

        var StorageFactory = require('./index');
        var report = new StorageFactory();

        report.addJSONReport(require('./testFeatures.js'));

        report.initConfig({
            link: 'http://test-runner-server.test.com/run?testname=',
            linkLabel: 'Run: '
        });

        var fs = require('fs');

        var data = report.getHTMLReport();
        //fs.writeFileSync('test.html', data);
        console.log('', data);
    });
});
