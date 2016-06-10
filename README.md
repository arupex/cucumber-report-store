# cucumber-report-store

[![npm version](https://badge.fury.io/js/cucumber-report-store.svg)](https://badge.fury.io/js/cucumber-report-store) [![dependencies](https://david-dm.org/arupex/cucumber-report-store.svg)](http://github.com/arupex/cucumber-report-store) ![Build Status](https://api.travis-ci.org/arupex/cucumber-report-store.svg?branch=master) <a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>

#Install

    npm install cucumber-report-store


#What's it do ?

Cucumber saves reports in json files, this turns them into fairly pretty html
Why not use the html reporter?
    1. Its not pretty enough
    2. Its not extensible
    3. The End Goal


#How To Use:


    var StorageFactory = require('cucumber-report-store');
       var report = new StorageFactory();
       report.addJSONReport(require('./testFeatures.js'));
        report.initConfig({
            link : 'http://test-runner-server.test.com/run?testname=',
            linkLabel : 'Run: '
        });

        var fs = require('fs');

        var data = report.getHTMLReport();
        fs.writeFileSync('test.html', data);



#The End Goal:

    Create a Cucumber Test Report you can interact with
    Interact with you say?
    Yes, we want the ability to rerun tests
    But How?
    A server side library that interacts with cucumber to rerun the tests right on the stack itself
        and have the report get automatically updated!


#Future Feature:

    Support Templating - for custom Html
    Server Side Code - express middleware
