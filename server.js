"use strict";

const SLACK_BOT_TOKEN = 'xoxb-59125268883-Jb86udMc9trcXCttixja218r';
const CLIENT_ID = '9016687319.53755457395';
const CLIENT_SECRET = '8fe6641dbee71c59b55f25e79a6c0a83';

let Botkit = require('botkit'),
    formatter = require('./modules/slack-formatter'),
    salesforce = require('./modules/salesforce'),
    request = require('superagent'),
    express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/auth'),
    approve = require('./modules/approve'),
    activateAgreement = require('./modules/activateAgreement'),
    addBundle = require('./modules/addBundle'),
    addToCart = require('./modules/addToCart'),
    compare = require('./modules/compare'),
    computePrice = require('./modules/computePrice'),
    configureProducts = require('./modules/configureProducts'),
    finalizeCart = require('./modules/finalizeCart'),
    generateAgreement = require('./modules/generateAgreement'),
    generateProposal = require('./modules/generateProposal'),
    searchProducts = require('./modules/searchProducts'),
    controller = Botkit.slackbot({interactive_replies: true}),
    app = express();
/*

const CLIENT_ID = '9016687319.53755457395';
const CLIENT_SECRET = '8fe6641dbee71c59b55f25e79a6c0a83';

    //OAUTH ACCESS REQUEST CODE 

app.get('/', (req, res) => {
    res.redirect(`https://slack.com/oauth/authorize?client_id=${CLIENT_ID}&scope=incoming-webhook+commands+bot&redirect_uri=${escape('https://apttus-slack.herokuapp.com/server')}`);
});

app.get('/server', (req, res) => {
    let code = req.query.code;

    request
        .get(`https://slack.com/api/oauth.access?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${escape('https://apttus-slack.herokuapp.com/server')}`)
        .end((err, result) => {
            if (err) {
                console.log(err);
                return res.send('An error occured!');
                }
            console.log(res.body);

            let botToken = 'xoxb-59125268883-Jb86udMc9trcXCttixja218r';
            console.log('Got the token:', botToken);

            startAptbot(result.body.bot.bot_access_token);

            res.send('SUCCESS, WAY TO GO DUDE!');
        });
    });

app.listen(8080, () => {
    console.log('listening');
});


function startAptbot(token) {
    const bot = controller.spawn({
        token: botToken
    })
    bot.startRTM(err => {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

*/
  //OAUTH ACCESS REQUEST CODE v2

    app.get('/', (req, res) => {
        res.redirect(`https://slack.com/oauth/authorize?client_id=${CLIENT_ID}&scope=incoming-webhook+commands+bot&redirect_uri=${escape('https://apttus-slack.herokuapp.com/salesforce')}`);
    });

    app.get('/salesforce', (req, res) => {
        let code = req.query.code;

        request
            .get(`https://slack.com/api/oauth.access?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${escape('https://apttus-slack.herokuapp.com/salesforce')}`)
            .end((err, result) => {
                if (err) {
                    console.log(err);
                    return res.send('An error occured! Please try again later');
                }

    bot = controller.spawn({
        token: SLACK_BOT_TOKEN
    });

bot.startRTM(err => {
    if (err) {
        throw new Error('Could not connect to Slack ');
    }
});
});
});

   /* 
    app.use(bodyParser.urlencoded({extended: true}));
    app.post('/approve', approve.execute);
    app.post('activateAgreement', activateAgreement.execute);
    app.post('addBundle', addBundle.execute);
    app.post('addToCart', addToCart.execute);
    app.post('compare', compare.execute);
    app.post('computePrice', computePrice.execute);
    app.post('configureProducts', configureProducts.execute);
    app.post('finalizeCart', finalizeCart.execute);
    app.post('generateAgreement', generateAgreement.execute);
    app.post('generateProposal', generateProposal.execute);
    app.post('searchProducts', searchProducts.execute);
*/


controller.hears(['help'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, {
        text: `Hello there, my name is Aptbot. You can ask me to do Apttus things like:
    "Search account Acme" or "Search Acme in acccounts"
    "Search contact Lisa Smith" or "Search Lisa Smith in contacts"
    "Search Opportunity Big Deal "
    "Search for Assets"
    "Search for Invoices"
    "Search for Agreements"
    "Search for Orders"
    "Create contact"
    "Create case"
    "Create Quote"
    "Create Agreement"
    "Log an ISR"
    "Create NDA"
    "Create MSA"`
    });
});

/*
controller.hears(['search account (.*)', 'search (.*) in accounts'], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    salesforce.findAccount(name)
        .then(accounts => bot.reply(message, {
            text: "I found these accounts matching  '" + name + "':",
            attachments: formatter.formatAccounts(accounts)
        }))
        .catch(error => bot.reply(message, error));
});

controller.hears(['search contact (.*)', 'find contact (.*)'], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    salesforce.findContact(name)
        .then(contacts => bot.reply(message, {
            text: "I found these contacts matching  '" + name + "':",
            attachments: formatter.formatContacts(contacts)
        }))
        .catch(error => bot.reply(message, error));
});

controller.hears(['top (.*) deals', 'top (.*) opportunities'], 'direct_message,direct_mention,mention', (bot, message) => {
    let count = message.match[1];
    salesforce.getTopOpportunities(count)
        .then(opportunities => bot.reply(message, {
            text: "Here are your top " + count + " opportunities:",
            attachments: formatter.formatOpportunities(opportunities)
        }))
        .catch(error => bot.reply(message, error));
});

controller.hears(['search opportunity (.*)', 'find opportunity (.*)'], 'direct_message,direct_mention,mention', (bot, message) => {

    let name = message.match[1];
    salesforce.findOpportunity(name)
        .then(opportunities => bot.reply(message, {
            text: "I found these opportunities matching  '" + name + "':",
            attachments: formatter.formatOpportunities(opportunities)
        }))
        .catch(error => bot.reply(message, error));

});


controller.hears(['search quote (.*)', 'find quote (.*)'], 'direct_message,direct_mention,mention', (bot, message) => {

    let name = message.match[1];
    salesforce.findQuote(name)
        .then(quotes => bot.reply(message, {
            text: "I found these quotes matching  '" + name + "':",
            attachments: formatter.formatQuotes(quotes)
        }))
        .catch(error => bot.reply(message, error));

});


controller.hears(['create case', 'new case'], 'direct_message,direct_mention,mention', (bot, message) => {

    let subject,
        description;

    let askSubject = (response, convo) => {

        convo.ask("What's the subject?", (response, convo) => {
            subject = response.text;
            askDescription(response, convo);
            convo.next();
        });

    };

    let askDescription = (response, convo) => {

        convo.ask('Enter a description for the case', (response, convo) => {
            description = response.text;
            salesforce.createCase({subject: subject, description: description})
                .then(_case => {
                    bot.reply(message, {
                        text: "I created the case:",
                        attachments: formatter.formatCase(_case)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askSubject);

});

controller.hears(['create contact', 'new contact'], 'direct_message,direct_mention,mention', (bot, message) => {

    let firstName,
        lastName,
        title,
        phone,
        email;

    let askFirstName = (response, convo) => {

        convo.ask("What's the first name?", (response, convo) => {
            firstName = response.text;
            askLastName(response, convo);
            convo.next();
        });

    };

    let askLastName = (response, convo) => {

        convo.ask("What's the last name?", (response, convo) => {
            lastName = response.text;
            askTitle(response, convo);
            convo.next();
        });

    };

    let askTitle = (response, convo) => {

        convo.ask("What's the title?", (response, convo) => {
            title = response.text;
            askPhone(response, convo);
            convo.next();
        });

    };

    let askPhone = (response, convo) => {

        convo.ask("What's the phone number?", (response, convo) => {
            phone = response.text;

            convo.next();
        });

    };

    let askEmail = (response, convo) => {

        convo.ask("What's the email", (response, convo) => {
            email = response.text;
            salesforce.createContact({firstName: firstName, lastName: lastName, title: title, phone: phone, email: email})
                .then(contact => {
                    bot.reply(message, {
                        text: "I created the contact:",
                        attachments: formatter.formatContact(contact)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askFirstName);

});

controller.hears(['Create Task', 'New Task', 'Log Task'], 'direct_message,direct_mention,mention', (bot, message) => {

    let Who,
        type,
        status,
        callDuration,
        location,
        product;

    let askWho = (response, convo) => {

        convo.ask("Who is this assigned to?", (response, convo) => {
            who = response.text;
            askType(response, convo);
            convo.next();
        });

    };

    let askType = (response, convo) => {

        convo.ask("What's the type?", (response, convo) => {
            type = response.text;
            askStatus(response, convo);
            convo.next();
        });

    };

    let askStatus = (response, convo) => {

        convo.ask("What's the status?", (response, convo) => {
            status = response.text;
            askCallDuration(response, convo);
            convo.next();
        });

    };

    let askCallDuration = (response, convo) => {

        convo.ask("What was the call duration?", (response, convo) => {
            callDuration = response.text;
            askLocation(response, convo);
            convo.next();
        });

    };

     let askLocation = (response, convo) => {

        convo.ask("What is the location?", (response, convo) => {
            location = response.text;
            askProduct(response, convo);
            convo.next();
        });

    };

     let askproduct = (response, convo) => {

        convo.ask("What's the product they are interested in?", (response, convo) => {
            product = response.text;
            salesforce.createTask({who: who, type: type, status: status, callDuration: callDuration, location: location, product: product})
                .then(task => {
                    bot.reply(message, {
                        text: "I created the task:"
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askWho);

});

controller.hears(['Create quote', 'new quote', 'Quote', 'New proposal', 'Create proposal'], 'direct_message,direct_mention,mention', (bot, message) => {

    let name,
        opportunityName,
        priceList;

    let askQuoteName = (response, convo) => {

        convo.ask("What's the Quote name?", (response, convo) => {
            name = response.text;
            askOpportunityName(response, convo);
            convo.next();
        });

    };

    let askOpportunityName = (response, convo) => {

        convo.ask("What's the Opportunity name?", (repsonse, convo) => {
            opportunityName = response.text;
            askPriceList(response, convo);
            convo.next();
        });
    }

    let askPriceList = (response, convo) => {

        convo.ask("Which Price List?", (response, convo) => {
            priceList = response.text;
            salesforce.createQuote({name: name, opportunityName: opportunityName, priceList: priceList})
                .then(quote => {
                    bot.reply(message, {
                        text: "I created the quote, would you like to Configure Products?",
                        attachments: formatter.formatQuote(quote)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askQuoteName);

});

controller.hears(['create agreement', 'new agreement', 'create contract', 'new contract', 'agreement'], 'direct_message,direct_mention,mention', (bot, message) => {

    let name,
        startDate,
        closeDate,
        type,
        status;

    let askAgreementName = (response, convo) => {

        convo.ask("What's the contract name?", (response, convo) => {
            name = response.text;
            askStartDate(response, convo);
            convo.next();
        });

    };

    let askStartDate = (response, convo) => {

        convo.ask("What's the Start Date?", (response, convo) => {
            startDate = response.text;
            askCloseDate(response, convo);
            convo.next();
        });

    };

    let askCloseDate = (response, convo) => {

        convo.ask("What's the Close Date?", (response, convo) => {
            closeDate = response.text;
            askType(response, convo);
            convo.next();
        });

    };

    let askType = (response, convo) => {

        convo.ask({
        attachments:[
            {
                title: 'What type of Contract?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"NDA",
                        "text": "NDA",
                        "value": "nda",
                        "type": "button",
                    },
                    {
                        "name":"MSA",
                        "text": "MSA",
                        "value": "msa",
                        "type": "button",
                    },
                     {
                        "name":"SOW",
                        "text": "SOW",
                        "value": "sow",
                        "type": "button",
                    },
                ]
            }
        ]
    },[
        {
            pattern: "nda",
            callback: function(reply, convo) {
                type = response.text;
                askStatus(response, convo);
                convo.next();
            }
        },
        {
            pattern: "msa",
            callback: function(reply, convo) {
                type = response.text;
                askStatus(response, convo);
                convo.next();
            }
        },
        {
            pattern: "sow",
            callback: function(reply, convo) {
                type = response.text;
                askStatus(response, convo);
                convo.next();
            }
        },
        {   
            default: true,
            callback: function(reply, convo) {
                // do nothing
            }
        }
    ]);

    }

    let askStatus = (response, convo) => {

        convo.ask("What's the status?", (response, convo) => {
            status = response.text;
            salesforce.createAgreement({Name: name, startDate: startDate, closeDate: closeDate, status: status})
                .then(agreement => {
                    bot.reply(message, {
                        text: "I created the agreement:",
                        attachments: formatter.formatAgreement(agreement)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askAgreementName);

});


controller.hears(['New NDA', 'Create NDA', 'NDA'], 'direct_message,direct_mention,mention', (bot, message) => {

    let account,
        contact,
        disclosed;

    let askAgreementAccount = (response, convo) => {

        convo.ask("Which Account?", (response, convo) => {
            account = response.text;
            askContact(response, convo);
            convo.next();
        });

    };

    let askContact = (response, convo) => {

        convo.ask("Who should I send it to?", (response, convo) => {
            contact = response.text;
            askDisclose(response, convo);
            convo.next();
        });
    };

    let askDisclose = (response, convo) => {

        convo.ask("What is being disclosed?", (response, convo) => {
            disclosed = response.text;
            salesforce.createNDA({Account: account, contact: contact, disclosed: disclosed})
                .then(nda => {
                    bot.reply(message, {
                        text: "I created the NDA and sent it to contact:",
                        attachments: formatter.formatNDA(nda)

                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askAgreementAccount);

});

controller.hears(['New NDA', 'Create NDA', 'NDA'], 'direct_message,direct_mention,mention', (bot, message) => {

    let account,
        contact,
        disclosed;

    let askAgreementAccount = (response, convo) => {

        convo.ask("Which Account?", (response, convo) => {
            account = response.text;
            askContact(response, convo);
            convo.next();
        });

    };

    let askContact = (response, convo) => {

        convo.ask("Who should I send it to?", (response, convo) => {
            contact = response.text;
            askDisclose(response, convo);
            convo.next();
        });
    };

    let askDisclose = (response, convo) => {

        convo.ask("What is being disclosed?", (response, convo) => {
            disclosed = response.text;
            salesforce.createNDA({Account: account, contact: contact, disclosed: disclosed})
                .then(nda => {
                    bot.reply(message, {
                        text: "I created the NDA and sent it to contact:",
                        attachments: formatter.formatNDA(nda)

                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askAgreementAccount);

});



controller.hears(['create ISR', 'new ISR', 'log ISR', ], 'direct_message,direct_mention,mention', (bot, message) => {

    let isr,
        start,
        end,
        type,
        activity;

    let askIsrNumber = (response, convo) => {

        convo.ask("What's the ISR number?", (response, convo) => {
            isr = response.text;
            askStart(response, convo);
            convo.next();
        });

    };

    let askStart = (response, convo) => {

        convo.ask("What was the Start time?", (response, convo) => {
            start = response.text;
            askClose(response, convo);
            convo.next();
        });

    };

    let askClose = (response, convo) => {

        convo.ask("When did you finish?", (response, convo) => {
            end = response.text;
            askType(response, convo);
            convo.next();
        });

    };

     let askType = (response, convo) => {

        convo.ask("What type of event?", (response, convo) => {
            type = response.text;
            askActivity(response, convo);
            convo.next();
        });

    };


    let askActivity = (response, convo) => {

        convo.ask("What type of activity?", (response, convo) => {
            activity = response.text;
            salesforce.createIsr({isr: isr, start: start, end: end, type: type, activity: activity})
                .then(_isr=> {
                    bot.reply(message, {
                        text: "I created the ISR:",
                        attachments: formatter.formatIsr(isr)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askIsrNumber);

});


controller.hears('Aptbots', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "The Apttus Slackbot",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Name",
                    "value": "Aptbot",
                    "short": true
                },
                {
                    "title": "Version",
                    "value": "1.1",
            "short": true
                }
            ],
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://pbs.twimg.com/profile_images/646414713140678656/eG9g7VqI.jpg"
        },


            {
                title: 'Do you like Apttus Aptbots?',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"yes",
                        "text": "Yes",
                        "value": "yes",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"no",
                        "text": "No",
                        "value": "no",
                        "style": "danger",
                        "type": "button",
                    }
                ]
            }
        ]
    });    
});



controller.hears('Approval Requests', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "HW-BL003",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$4,954.00",
                    "short": true
                },
                {
                    "title": "Discount",
                    "value": "15%",
                    "short": true
                },
                {
                    "title": "Extended Price",
                    "value": "$4,211.00",
                    "short": true
                }
            ],
            "author_name": "WS460c Gen8 Graphics Server Blade",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSIhgmREbJQpZnqBsFVL_3PBgZieXqZLNTpEuwHxj5CTEgZL4"
        },


            {
                title: 'Do you want to approve this quote?',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"Approve",
                        "text": "Approve",
                        "value": "Approve",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"Reject",
                        "text": "Reject",
                        "value": "Reject",
                        "style": "danger",
                        "type": "button",
                    }
                ]
            }
        ]
    });    
});




controller.hears('Blade Servers', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "HW-BL003",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$4,954.00",
                    "short": true
                },
            ],
            "author_name": "WS460c Gen8 Graphics Server Blade",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSIhgmREbJQpZnqBsFVL_3PBgZieXqZLNTpEuwHxj5CTEgZL4"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "Add to Cart",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "Configure",
                        "type": "button",
                    },
                    {
                        "name":"compareProducts",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "HW-BL004",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$7,786.00",
                    "short": true
                },
            ],
            "author_name": "BL660c Gen8 Server Blade",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqk-5LjSdH2qr0Ne4ba0_6ILR5HjBRvws9Sit4yhOsyfGbYGC8GA"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "Add to Cart",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "Configure",
                        "type": "button",
                    },
                    {
                        "name":"compareProducts",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "HW-BL002",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$4,954.00",
                    "short": true
                },
            ],
            "author_name": "BL460c Gen8 Server Blade",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACAAbSbBjkLPKwl_VFKGlp9ETasobKRjsTkQaBFv820uJLbtV"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "Add to Cart",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "Configure",
                        "type": "button",
                    },
                    {
                        "name":"compareProducts",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    }
                ]
            }
        ]
    });    
});




controller.hears('Tier 1 Software', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "SW-SLCRM003",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$125.00",
                    "short": true
                },
            ],
            "author_name": "Sales Enterprise",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://apttusdemo--apttus-config2.na34.visual.force.com/servlet/servlet.FileDownload?file=00P61000000VQFIEA4"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "Add to Cart",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "Configure",
                        "type": "button",
                    },
                    {
                        "name":"compareProducts",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "SW-SLCRM005",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$195.00",
                    "short": true
                },
            ],
            "author_name": "Sales Global",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://apttusdemo--apttus-config2.na34.visual.force.com/servlet/servlet.FileDownload?file=00P61000000VQFKEA4"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "Add to Cart",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"ConfigureProducts",
                        "text": "Configure",
                        "value": "Configure",
                        "type": "button",
                    },
                    {
                        "name":"compareProducts",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "SW-SL004",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$65.00",
                    "short": true
                },
            ],
            "author_name": "Sales Corporate",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://apttusdemo--apttus-config2.na34.visual.force.com/servlet/servlet.FileDownload?file=00P61000000VQFJEA4"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "Add to Cart",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "Configure",
                        "type": "button",
                    },
                    {
                        "name":"compareProducts",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    }
                ]
            }
        ]
    });    
});






controller.hears('Cloud Server Solution', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "CSS",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$45,999.00",
                    "short": true
                },
                {
                    "title": "Product Description",
                    "value": "Our super cloud server configuration allows customers to create their own super cloud structure for their internal business users as well as their customer and partner networks.",
                    "short": false
                },
            ],
            "author_name": "Cloud Server Solution",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://echopath.com/wp-content/uploads/2014/07/iStock_000018938602Small.jpg"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [                   
                    {
                        "name":"configureAttributes",
                        "text": "Attributes",
                        "value": "Attributes",
                        "type": "button",
                    },
                    {
                        "name":"configureOptions",
                        "text": "Options",
                        "value": "Options",
                        "type": "button",
                    },
                    {
                        "name":"configureCompare",
                        "text": "Compare",
                        "value": "Compare",
                        "type": "button",
                    },
                    {
                        "name":"checkout",
                        "text": "Checkout",
                        "value": "Checkout",
                        "type": "button",
                    }
                    
                ]
            }           
        ]
    });    
});




controller.hears('Assets', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "CSS",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$45,999.00",
                    "short": true
                },
                {
                    "title": "Product Description",
                    "value": "Our super cloud server configuration allows customers to create their own super cloud structure for their internal business users as well as their customer and partner networks.",
                    "short": false
                },
            ],
            "author_name": "Cloud Server Solution",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://echopath.com/wp-content/uploads/2014/07/iStock_000018938602Small.jpg"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [                   
                    {
                        "name":"renewAsset",
                        "text": "Renew",
                        "value": "Renew",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"amendAsset",
                        "text": "Amend",
                        "value": "Amend",
                        "type": "button",
                    },
                    {
                        "name":"terminateAsset",
                        "text": "Terminate",
                        "value": "Terminate",
                        "style": "danger",
                        "type": "button",
                    },
                    {
                        "name":"expireAsset",
                        "text": "Expire",
                        "value": "Expire",
                        "style": "danger",
                        "type": "button",
                    }
                    
                ]
            }           
        ]
    });    
});




controller.hears('Venture Industries', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Account",
                    "value": "Venture Industries",
                    "short": true
                },
                {
                    "title": "Close Date",
                    "value": "6/30/2016",
                    "short": true
                },
                {
                    "title": "Price List",
                    "value": "Tier 1 Hardware & Software",
                    "short": true
                },
                {
                    "title": "Pricing Agreement Number",
                    "value": "00001410.0",
                    "short": true
                },
            ],
            "author_name": "Venture Industries Opportunity",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.ventureind.com/new%20ventrure/images/ventureind_logo.gif"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [                   
                    {
                        "name":"createQuote",
                        "text": "Create Quote",
                        "value": "Create Quote",
                        "type": "button",
                    },
                    {
                        "name":"createAgreement",
                        "text": "Create Agreement",
                        "value": "Create Agreement",
                        "type": "button",
                    },
                    {
                        "name":"closeWon",
                        "text": "Close Won",
                        "value": "Close Won",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"closeLost",
                        "text": "Close Lost",
                        "value": "Close Lost",
                        "style": "danger",
                        "type": "button",
                    }
                    
                ]
            }           
        ]
    });    
});




controller.hears('Renewals', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Account",
                    "value": "Venture Industries",
                    "short": true
                },
                {
                    "title": "Contract End Date",
                    "value": "6/30/2016",
                    "short": true
                },
                {
                    "title": "Primary Contact",
                    "value": "Diego Francis",
                    "short": true
                },
                {
                    "title": "TAV",
                    "value": "$155,000",
                    "short": true
                },
            ],
            "author_name": "Venture Industries",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.ventureind.com/new%20ventrure/images/ventureind_logo.gif"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [                   
                    {
                        "name":"renewContract",
                        "text": "Renew Contract",
                        "value": "Renew Contract",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"amendContract",
                        "text": "Amend Contract",
                        "value": "Amend Contract",
                        "type": "button",
                    },
                    {
                        "name":"generate",
                        "text": "Generate",
                        "value": "Generate",
                        "type": "button",
                    },
                    {
                        "name":"emailPrimaryContact",
                        "text": "Email Primary Contact",
                        "value": "Email Primary Contact",
                        "type": "button",
                    }
                    
                ]
            }           
        ]
    });    
});



controller.hears('Future Contract Hypercard', 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, {
        attachments:[
            {
            "title": "",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Account",
                    "value": "Venture Industries",
                    "short": true
                },
                {
                    "title": "Contract Start Date",
                    "value": "6/24/2016",
                    "short": true
                },
                {
                    "title": "Contract End Date",
                    "value": "6/23/2017",
                    "short": true
                },
                {
                    "title": "TAV",
                    "value": "$155,000.00",
                    "short": true
                },
            ],
            "author_name": "Venture Industries",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.ventureind.com/new%20ventrure/images/ventureind_logo.gif"
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"generate",
                        "text": "Generate",
                        "value": "Generate",
                        "type": "button",
                    },                   
                    {
                        "name":"renewContract",
                        "text": "Renew Contract",
                        "value": "Renew Contract",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"amendContract",
                        "text": "Amend Contract",
                        "value": "Amend Contract",
                        "type": "button",
                    },
                    {
                        "name":"terminate",
                        "text": "Terminate",
                        "value": "Terminate",
                        "style": "danger",
                        "type": "button",
                    },
                    {
                        "name":"expire",
                        "text": "Expire",
                        "value": "Expire",
                        "style": "danger",
                        "type": "button",
                    }
                    
                ]
            }           
        ]
    });    
});

controller.hears(['Configure Products', 'New Configuration'], 'direct_message,direct_mention,mention', (bot, message) => {

    let productName,
        quantity,
        discount;

    let askProductName = (response, convo) => {

        convo.ask({
        attachments:[
            {
                "title": "WS460c Gen8 Graphics Server Blade",
                "title_link": "https://na30.salesforce.com/01t36000001hmdk",
                "color": "#62A70F",
                "callback_id": '123',
                "fields": [
                    {
                        "title": "Product Code",
                        "value": "HW-BL003",
                        "short": true
                    },
                    {
                        "title": "List Price",
                        "value": "$4,954.00",
                        "short": true
                    },
                ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSIhgmREbJQpZnqBsFVL_3PBgZieXqZLNTpEuwHxj5CTEgZL4",
        },

            {
                title: '',
                callback_id: '123',
                color: "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "WS460c Gen8 Graphics Server Blade",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configure",
                        "text": "Configure",
                        "value": "WS460c Gen8 Graphics Server Blade",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "BL660c Gen8 Server Blade",
            "title_link": "https://na30.salesforce.com/01t36000001hmcK",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "HW-BL004",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$7,786.00",
                    "short": true
                },
            ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqk-5LjSdH2qr0Ne4ba0_6ILR5HjBRvws9Sit4yhOsyfGbYGC8GA",
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "BL660c Gen8 Server Blade",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configure",
                        "text": "Configure",
                        "value": "BL660c Gen8 Server Blade",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "BL460c Gen8 Server Blade",
            "title_link": "https://na30.salesforce.com/01t36000001hmc9",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "HW-BL002",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$4,954.00",
                    "short": true
                },
            ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACAAbSbBjkLPKwl_VFKGlp9ETasobKRjsTkQaBFv820uJLbtV",
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "BL460c Gen8 Server Blade",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configure",
                        "text": "Configure",
                        "value": "BL460c Gen8 Server Blade",
                        "type": "button",
                    }
                ]
            }
        ]  
    },[
        {
            pattern: "WS460c Gen8 Graphics Server Blade",
            callback: function(response, convo) {
                productName = response.text;
                convo.say('Ok, I added: ' + response.text);
                askQuantity(response, convo);
                convo.next();
            }
        },
        {
            pattern: "BL660c Gen8 Server Blade",
            callback: function(response, convo) {
                productName = response.text;
                convo.say('Ok, I added: ' + response.text);
                askQuantity(response, convo);
                convo.next();
            }
        },
        {
            pattern: "BL460c Gen8 Server Blade",
            callback: function(response, convo) {
                productName = response.text;
                convo.say('Ok, I added: ' + response.text);
                askQuantity(response, convo);
                convo.next();
            }
        },
        {   
            default: true,
            callback: function(response, convo) {
            }
        }

    ]);
};

    let askQuantity = (response, convo) => {

        convo.ask("How many Blade Servers?", (response, convo) => {
            quantity = response.text;
            askDiscount(response, convo);
            convo.next();
        });
    }

    let askDiscount = (response, convo) => {

        convo.ask("What is the discount?", (response, convo) => {
            discount = response.text;
            salesforce.createCart({productName: productName, quantity: quantity, discount: discount})
                .then(cart => {
                    bot.reply(message, {
        attachments:[
            {
            "title": "Q-00000520",
            "title_link": "https://na30.salesforce.com/a3V360000009ohT",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Name",
                    "value": "WS460c Gen8 Graphics Server Blade",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$4,954.00",
                    "short": true
                },
                {
                    "title": "Discount",
                    "value": "15%",
                    "short": true
                },
                {
                    "title": "Extended Price",
                    "value": "$842,200.00",
                    "short": true
                }
            ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSIhgmREbJQpZnqBsFVL_3PBgZieXqZLNTpEuwHxj5CTEgZL4"
        },


            {
                title: 'Quote Actions',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"generateProposal",
                        "text": "Generate",
                        "value": "Generate",
                        "type": "button",
                    },
                    {
                        "name":"present",
                        "text": "Present",
                        "value": "Present",
                        "type": "button",
                    },
                    {
                        "name":"sendForeSignature",
                        "text": "Send for eSignature",
                        "value": "Send for eSignature",
                        "type": "button",
                    }
                ]
            }
        ]
    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askProductName);

});




controller.hears(['Add Slack Licenses', 'Add Licenses'], 'direct_message,direct_mention,mention', (bot, message) => {

    let productName,
        quantity,
        discount;

    let askProductName = (response, convo) => {

        convo.ask({
        attachments:[
            {
                "title": "Slack Standard",
                "title_link": "https://na30.salesforce.com/01t36000001hmdk",
                "color": "#62A70F",
                "callback_id": '123',
                "fields": [
                    {
                        "title": "Product Code",
                        "value": "slk-2",
                        "short": true
                    },
                    {
                        "title": "List Price",
                        "value": "$6.97",
                        "short": true
                    },
                ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.greenmellenmedia.com/wp-content/uploads/slack-chat.png",
        },

            {
                title: '',
                callback_id: '123',
                color: "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "WS460c Gen8 Graphics Server Blade",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "WS460c Gen8 Graphics Server Blade",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "Slack Plus",
            "title_link": "https://na30.salesforce.com/01t36000001hmcK",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "slk-3",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$12.50",
                    "short": true
                },
            ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.greenmellenmedia.com/wp-content/uploads/slack-chat.png",
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "BL660c Gen8 Server Blade",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "BL660c Gen8 Server Blade",
                        "type": "button",
                    }
                ]
            },
             {
            "title": "Slack Enterprise",
            "title_link": "https://na30.salesforce.com/01t36000001hmc9",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Code",
                    "value": "slk-4",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$25.00",
                    "short": true
                },
            ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.greenmellenmedia.com/wp-content/uploads/slack-chat.png",
        },


            {
                title: '',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"addToCart",
                        "text": "Add to Cart",
                        "value": "BL460c Gen8 Server Blade",
                        "style": "primary",
                        "type": "button",
                    },
                    {
                        "name":"configureProducts",
                        "text": "Configure",
                        "value": "BL460c Gen8 Server Blade",
                        "type": "button",
                    }
                ]
            }
        ]  
    },[
        {
            pattern: "Slack Standard",
            callback: function(response, convo) {
                productName = response.text;
                convo.say('Ok, I added: ' + response.text);
                askQuantity(response, convo);
                convo.next();
            }
        },
        {
            pattern: "Slack Plus",
            callback: function(response, convo) {
                productName = response.text;
                convo.say('Ok, I added: ' + response.text);
                askQuantity(response, convo);
                convo.next();
            }
        },
        {
            pattern: "Slack Enterprise",
            callback: function(response, convo) {
                productName = response.text;
                convo.say('Ok, I added: ' + response.text);
                askQuantity(response, convo);
                convo.next();
            }
        },
        {   
            default: true,
            callback: function(response, convo) {
            }
        }

    ]);
};

    let askQuantity = (response, convo) => {

        convo.ask("How many Licenses?", (response, convo) => {
            quantity = response.text;
            askDiscount(response, convo);
            convo.next();
        });
    }

    let askDiscount = (response, convo) => {

        convo.ask("What is the discount?", (response, convo) => {
            discount = response.text;
            salesforce.createCart({productName: productName, quantity: quantity, discount: discount})
                .then(cart => {
                    bot.reply(message, {
        attachments:[
            {
            "title": "Q-00000520",
            "title_link": "https://na30.salesforce.com/a3V360000009ohT",
            "color": "#62A70F",
            "fields": [
                {
                    "title": "Product Name",
                    "value": "Slack Standard",
                    "short": true
                },
                {
                    "title": "List Price",
                    "value": "$6.97",
                    "short": true
                },
                {
                    "title": "Discount",
                    "value": "15%",
                    "short": true
                },
                {
                    "title": "Extended Price",
                    "value": "$13,940",
                    "short": true
                }
            ],
            "author_name": "",
            "author_icon": "https://api.slack.com/img/api/homepage_custom_integrations-2x.png",
            "image_url": "http://www.greenmellenmedia.com/wp-content/uploads/slack-chat.png"
        },


            {
                title: 'Quote Actions',
                callback_id: '123',
                "color": "#62A70F",
                attachment_type: 'default',
                actions: [
                    {
                        "name":"generateProposal",
                        "text": "Generate",
                        "value": "Generate",
                        "type": "button",
                    },
                    {
                        "name":"present",
                        "text": "Present",
                        "value": "Present",
                        "type": "button",
                    },
                    {
                        "name":"sendForeSignature",
                        "text": "Send for eSignature",
                        "value": "Send for eSignature",
                        "type": "button",
                    }
                ]
            }
        ]
    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askProductName);

});
*/