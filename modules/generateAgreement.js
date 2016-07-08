var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.SLACK_APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(",");
    var name = params[0];
    var comments = params[1];

    var c = nforce.createSObject('Slack_Requests__c');
    c.set('Type__c', 'Approval');
    c.set('Approval_Id__c', name);
    c.set('Approved__c', 'Yes');
    c.set('Approval_Comments__c', comments);


    org.insert({ sobject: c}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("The quote has been Approved!");
        } else {
            var fields = [];
            fields.push({title: "Status:", value: 'Approved', short:false});
            fields.push({title: "Approval Request:", value: name, short:false});
            fields.push({title: "Comments:", value: comments, short:false});
            fields.push({title: "Link", value: 'https://login.salesforce.com/' + resp.id, short:false});
            var message = {
                response_type: "in_channel",
                text: "Quote has been approved:",
                attachments: [
                    {color: "#62A7OF", fields: fields}
                ]
            };
            res.json(message);
        }
    });
}

exports.execute = execute;