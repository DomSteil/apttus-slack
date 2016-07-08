var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.SLACK_APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(",");
    var productA = params[0];
    var productB = params[1];
    var productC = params[2];

    var c = nforce.createSObject('Slack_Requests__c');
    c.set('Type__c', 'CPQ');
    c.set('Product_Name__c', productA, productB, productC);


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