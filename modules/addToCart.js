var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.SLACK_APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(",");
    var cartId = params[0];
    var products = params[1];

    var c = nforce.createSObject('Slack_Requests__c');
    c.set('Type__c', 'CPQ');
    c.set('CPQ_Actions__c','Add to Cart');
    c.set('CartId__c', cartId);
    c.set('Product_Name__c', products);



    org.insert({ sobject: c}, function(err, resp) {
            res.json(message);
        }
    });
}

exports.execute = execute;