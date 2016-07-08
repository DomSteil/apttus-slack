var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.SLACK_APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(",");
    var priceList = params[0];
    var searchText = params[1];

    var c = nforce.createSObject('Slack_Requests__c');
    c.set('Type__c', 'CPQ');
    c.set('priceListId__c', priceList);
    c.set('searchText', searchText);


    org.insert({ sobject: c}, function(err, resp) {
            res.json(message);
        }
    });
}

exports.execute = execute;