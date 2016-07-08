var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.SLACK_APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(",");
    var agreement = params[0];

    var c = nforce.createSObject('Slack_Requests__c');
    c.set('Type__c', 'Activate');
    c.set('agreement_Id__c', agreement);

    org.insert({ sobject: c}, function(err, resp) {
            res.json(message);
        }
    });
}

exports.execute = execute;