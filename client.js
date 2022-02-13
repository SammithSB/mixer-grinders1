const axios = require('axios');
axios.post("https://mighty-forest-70605.herokuapp.com/predict", {
            text: "modi u are a hopeless pm apne garib ko maar daala i hate u sirf aap bol bacchan dete ho karte kuch bhi nhi u r fake person"
        }).then(function (response) {
            //handle response here
            //  msg.reply(response['data']);
            console.log(response['data'])
        })