/**
 * Created by daniel.irwin on 5/24/16.
 */
var report = require('./index');

report.addJSONReport([
    {
        name : 'Feature 1',
        description : 'My First Feature',
        elements : [
            {
                name : 'How Do Scenarios Work',
                tags : [{ name : '@wip' }],
                steps : [
                    {
                        keyword : 'Given',
                        name : 'I have no idea what I am doing',
                        result : {
                            status : 'skipped'
                        }
                    }
                ]
            },
            {
                name : 'Scenarios Are Cool',
                tags : [{ name : '@dip' }],
                steps : [
                    {
                        keyword : 'Given',
                        name : 'I want to learn',
                        result : {
                            status : 'pending'
                        }
                    }
                ]
            }
        ]
    },
    {
        name : 'Feature 2',
        description : 'My Second Feature',
        elements : [
            {
                name : 'I can test anything with automation',
                tags : [{ name : '@flip' }],
                steps : [
                    {
                        keyword : 'Given',
                        name : 'I am learning',
                        result : {
                            status : 'failed'
                        }
                    }
                ]
            },
            {
                name : 'Beep Boop Bop',
                tags : [{ name : '@binary' }],
                steps : [
                    {
                        keyword : 'Given',
                        name : 'I am a Pro',
                        result : {
                            status : 'passed'
                        }
                    }
                ]
            }
        ]
    }
]);

var fs = require('fs');

var data = report.getHTMLReport();
fs.writeFileSync('test.html', data);
console.log('', data);