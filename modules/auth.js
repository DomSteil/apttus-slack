var nforce = require('nforce'),

    SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    SF_USER_NAME = process.env.SF_USER_NAME,
    SF_PASSWORD = process.env.SF_PASSWORD,
    SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

org = nforce.createConnection({
    clientId: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/oauth/_callback',
    mode: 'single',
    autoRefresh: true
});

function login() {
    org.authenticate({username: SF_USER_NAME, password: SF_PASSWORD}, function (err, resp) {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log("Authentication successful");
        }
    });
}

exports.login = login;
exports.org = org;