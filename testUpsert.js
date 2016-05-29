/**
 * Created by daniel.irwin on 5/24/16.
 */
describe('testUpsert', function(){

    var StorageFactory = require('./index');

    it('try upsert', function(){

        var storage = new StorageFactory();

        storage.addJSONReport(require('./testFeatures'));

        storage.upsertFeatures([{
          name : 'Feature 1',
            elements : [
                {
                    name : 'How Do Scenarios Work',
                    steps : []
                }
            ]
        }]);

        var data = storage.getJsonData();

        //console.log('', data);

    });

    it('try upsert', function(){

        var storage2 = new StorageFactory();

        var input = require('./testFeatures');

        delete input[0].elements;
        delete input[1].elements;

        storage2.addJSONReport(input);

        storage2.upsertFeatures([{
            name : 'Feature 1',
            elements : [
                {
                    name : 'How Does anything Work',
                    steps : []
                }
            ]
        }]);

        var data2 = storage2.getJsonData();

        //console.log('', JSON.stringify(data2, null, 3));

    });

});