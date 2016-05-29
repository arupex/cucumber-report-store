
module.exports = function CucumberReportStore(init_config){

    var storage = [];
    var config = {};
    if(init_config){
        config = init_config;
    }

    function accordian(html, name, color, link){
        var shortName = name.replace(/ /g, '');
        var longLink = '';
        var longLinkLabel = link;
        if(config.linkLabel){
            longLinkLabel = config.linkLabel + link;
        }
        if(config.link){
            longLink = config.link + link;
        }

        return `
        <div class="panel-group" id="accordion-${shortName}">
            <div class="panel panel-default">
                <div class="panel-heading" style="background-color:${color}">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian-${shortName}" href="#collapse-${shortName}">${name}</a>
                        <a class="pull-right" data-toggle="collapse" data-parent="#accordian-${shortName}" href="${longLink}">${longLinkLabel}</a>
                    </h4>
                </div>
                <div id="collapse-${shortName}" class="panel-collapse collapse in">
                    <div class="panel-body">
                        ${html}
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    function addJSONReport(arrayOfFeatures){

        if(arrayOfFeatures){
            arrayOfFeatures.forEach(function(feature){
                storage.push(feature);
            });
        }
    }

    function handleFeature(feature){
        var featureHtml = '';

        featureHtml = featureHtml + '\n\t\t<h3>' + feature.name + '</h3>\n';
        featureHtml = featureHtml + '\n\t\t<h4>' + feature.description + '</h4>\n';

        if(feature && feature.elements){
            feature.elements.forEach(function scenarioIterate(scenario){

                featureHtml = featureHtml + handleScenario(scenario, feature.uri);

            });
        }

        return '\n\t' + accordian(featureHtml, feature.name, 'grey', feature.uri) + '\n';
    }

    function handleScenario(scenario, uri){
        var scenarioHtml = '';

        scenarioHtml = scenarioHtml + '\n\t\t<div>' +scenario.name + '</div>\n';

        if(scenario && scenario.tags){
            scenario.tags.forEach(function iterateOverTags(tag){
                scenarioHtml = scenarioHtml + '\n\t\t<h5>' + tag.name + '</h5>\n';
            });
        }

        var healthy = true;
        if(scenario && scenario.steps){
            scenario.steps.forEach(function iterateSteps(step){

                scenarioHtml = scenarioHtml + handleStep(step);

                healthy = healthy && stepPassed(step);
            });
        }
        return accordian(scenarioHtml, scenario.name, healthy?'green':'red', uri + ':' + scenario.line);
    }

    function stepPassed(step){
        if(step.result) {
            return step.result.status === 'passed';
        }
        return true;//not really but w/e
    }

    function handleStep(step){
        var stepHtml = '';

        stepHtml = stepHtml + '' + step.keyword + '';
        stepHtml = stepHtml + ' ' + step.name + '';

        if(step.result){
            var spanColor = (step.result.status==='passed'?(config.passedColor||'green'):(config.failedColor||'red'));
            stepHtml = stepHtml + ' <span style="background-color:'+spanColor+'">' + step.result.status + '</span>';
        }

        return '' + stepHtml + '<br/>';
    }

    function getHTMLReport(){

        var html = '';
        if(storage){
            storage.forEach(function iterateOnFeature(feature){

                html = html + handleFeature(feature)

            });
        }
        var color = config.backgroundColor || 'gray';
        return `
            <html>
               <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
                  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
                </head>
                <body style="background-color:${color}">

                    <div class="container">
                        ${html}
                    </div>
                </body>
            </html>`;
    }

    function clear(){
        storage = [];
    }

    //nasty function for upserting features and replacing scenarios within
    function upsertFeatures(features) {
        if (features) {
            function iterateProposedFeatures(proposedFeature) {
                function iterateFeatures(feature) {
                    if (feature.name === proposedFeature.name) {

                        if(feature.elements) {
                            for(var indexOfScenario = 0; indexOfScenario < feature.elements.length; ++ indexOfScenario){
                                if(proposedFeature.elements){
                                    function iterateProposedScenarios(proposedScenario){
                                        if(feature.elements[indexOfScenario].name === proposedScenario.name){
                                            feature.elements[indexOfScenario] = proposedScenario;
                                        }
                                    }
                                    proposedFeature.elements.forEach(iterateProposedScenarios);
                                }
                            }
                        }
                        else { //just completely override
                            feature.elements = proposedFeature.elements;
                        }

                    }
                }

                if (storage) {
                    storage.forEach(iterateFeatures);
                }
                else { //just completely override
                    storage = features;
                }
            }

            features.forEach(iterateProposedFeatures);
        }
    }

    function initConfig(input){
        config = input;
    }

    function getJsonData(){
        if(storage){
            return JSON.parse(JSON.stringify(storage));
        }
        return undefined;
    }

    return {
        addJSONReport : addJSONReport,
        getHTMLReport : getHTMLReport,
        clear : clear,
        upsertFeatures : upsertFeatures,
        initConfig : initConfig,
        getJsonData : getJsonData
    };
};