const express = require('express');
const https = require('https');
const url = require('url');
var request = require("request");
var moment = require("moment")
const axios = require('axios');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.get('/:id', function(req, res) {


    console.log("proxy");
    const url = new URL(req.params.id);

    console.log(url);

    const options = {
        hostname: url.host,
        port: 443,
        path: url.path,
        method: 'GET',
        cookie: "btag=655011_5D6101D97C92469EAE8E3BFC6967519C; bannerId=5D6101D97C92469EAE8E3BFC6967519C; affiliateId=655011; _gid=GA1.2.1134093021.1630790068; _ym_uid=1630790068770078752; _ym_d=1630790068; __zlcmid=15ukJ62G1RrKGuM; _ym_isad=2; tzo=-180; cls=en; selectedSliderEvent=-1; login=0; helpAnimationShownCount=1; cf_clearance=FQxfQwi2K7vjA5vGPazSoNNDaS.PA4IvOCuHtj_EnOQ-1630876641-0-150; _gat=1; _gat_UA-126024261-8=1; _ym_visorc=w; JSESSIONID=ip-172-31-70-188_nuo3ojv640b31eolpqxi3j69a63026; AWSELB=8907CDD51873DC30F281031D514F4D81DFB3D50E3B25801F33766A708C008B0C86E89F2DD9653CBA34F3D4FC73A1CFA1A943EA5C6CCC984EFF571853319783B3D1BCEBE544; _ga=GA1.2.219881190.1630790068; _ga_CEP748K5H2=GS1.1.1630876646.4.1.1630876654.0"
    }

    const hreq = https.request(options, hres => {
        console.log(`statusCode: ${hres.statusCode}`)

        hres.on('data', d => {
            console.log(d);
            // res.write(d);
            // res.end();

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': d.length
            });
            res.write(d);
            //  res.status(200).send(d);

            //process.stdout.write(d)
        })
    })

    hreq.on('error', error => {
        console.error(error)
    })

    hreq.end()



});

router.get('/betradar/:id', function(req, res) {

    console.log(req.params.id);


    var options = {
        url: "https://lmt.fn.sportradar.com/rivalo/tr/Europe:Berlin/gismo/match_timeline/" +
            req.params.id,
        headers: {
            'Accept': '*/*',
            'User-Agent': 'PostmanRuntime/7.28.4',
            'Referer': 'http://localhost/'
        }
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body)
            const match = JSON.parse(body);
            //console.log(match.doc[0].event);

            if (match.doc[0].event == 'exception') {
                res.status(200).send("Maç Bulunmadı");
                return;
            }
            let unix_timestamp = match.doc[0].data.match.ptime;
            var then = new Date(unix_timestamp * 1000);
            var now = new Date();


            var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
            var d = moment.duration(ms);

            var minutes = d.minutes();
            var second = d.seconds();
            if (match.doc[0].data.match.p == "2")
                minutes += 45;





            // console.log(" m: " +minutes + " start: "+ format_time(match.doc[0].data.match._dt.uts) + " current: " + format_time(match.doc[0].data.match.ptime) );
            var xmlStr =
                '<html><head> <meta http-equiv="refresh" content="1"> </head><body>' +
                '<div>' + match.doc[0].data.match.teams.home.abbr + ' - ' + match.doc[0].data.match.teams.away.abbr + '</div>' +
                '<div>' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '</div>';
            if (second < 10)
                xmlStr += '<div>' + minutes + ': 0' + second + '</div>';
            else
                xmlStr += '<div>' + minutes + ': ' + second + '</div>';

            '<match id="' +
            req.params.id +
                '" name="' +
                match.doc[0].data.match.teams.home.abbr +
                " - " +
                match.doc[0].data.match.teams.away.abbr +
                '" time = "' +
                minutes +
                ': ' + second + '" score = "' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '"  >' +
                "</match></body></html>";

            res.set("Content-Type", "text/html");
            res.status(200).send(xmlStr);
            //console.log(body);
        } else if (error) {
            res.status(200).send(error);
        }
    });




    // request.get(
    //     "https://lmt.fn.sportradar.com/rivalo/tr/Europe:Berlin/gismo/match_timeline/" +
    //     req.params.id,
    //     function(error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             //console.log(body)
    //             const match = JSON.parse(body);
    //             //console.log(match.doc[0].event);

    //             if (match.doc[0].event == 'exception') {
    //                 res.status(200).send("Maç Bulunmadı");
    //                 return;
    //             }
    //             let unix_timestamp = match.doc[0].data.match.ptime;
    //             var then = new Date(unix_timestamp * 1000);
    //             var now = new Date();


    //             var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
    //             var d = moment.duration(ms);

    //             var minutes = d.minutes();
    //             var second = d.seconds();
    //             if (match.doc[0].data.match.p == "2")
    //                 minutes += 45;





    //             // console.log(" m: " +minutes + " start: "+ format_time(match.doc[0].data.match._dt.uts) + " current: " + format_time(match.doc[0].data.match.ptime) );
    //             var xmlStr =
    //                 '<html><head> <meta http-equiv="refresh" content="1"> </head><body>' +
    //                 '<div>' + match.doc[0].data.match.teams.home.abbr + ' - ' + match.doc[0].data.match.teams.away.abbr + '</div>' +
    //                 '<div>' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '</div>';
    //             if (second < 10)
    //                 xmlStr += '<div>' + minutes + ': 0' + second + '</div>';
    //             else
    //                 xmlStr += '<div>' + minutes + ': ' + second + '</div>';

    //             '<match id="' +
    //             req.params.id +
    //                 '" name="' +
    //                 match.doc[0].data.match.teams.home.abbr +
    //                 " - " +
    //                 match.doc[0].data.match.teams.away.abbr +
    //                 '" time = "' +
    //                 minutes +
    //                 ': ' + second + '" score = "' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '"  >' +
    //                 "</match></body></html>";

    //             res.set("Content-Type", "text/html");
    //             res.status(200).send(xmlStr);
    //             //console.log(body);
    //         } else if (error) {
    //             res.status(200).send(error);
    //         }
    //     }
    // );



});


router.get('/betradar2/:id', function(req, res) {

    console.log(req.params.id);

    axios.get("https://lmt.fn.sportradar.com/common/tr/Etc:UTC/gismo/match_timelinedelta/" +
        req.params.id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }).then(function(response) {
        //console.log('response is : ' + response.data);
        // res.status(200).send(response.data);
        const match = response.data //JSON.parse(response.data);
            //console.log(match.doc[0].event);

        if (match.doc[0].event == 'exception') {
            res.status(200).send("Maç Bulunmadı");
            return;
        }
        let unix_timestamp = match.doc[0].data.match.ptime;
        var then = new Date(unix_timestamp * 1000);
        var now = new Date();


        var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);

        var minutes = d.minutes();
        var second = d.seconds();
        if (match.doc[0].data.match.p == "2")
            minutes += 45;

        if (match.doc[0].data.match.status._id == 31) {
            minutes = 45;
            second = 0;
        }




        // console.log(" m: " +minutes + " start: "+ format_time(match.doc[0].data.match._dt.uts) + " current: " + format_time(match.doc[0].data.match.ptime) );
        var xmlStr =
            '<html><head> <meta http-equiv="refresh" content="1"> </head><body>' +
            '<div>' + match.doc[0].data.match.teams.home.abbr + ' - ' + match.doc[0].data.match.teams.away.abbr + '</div>' +
            '<div>' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '</div>';

        if (second < 10)
            xmlStr += '<div>' + minutes + ':0' + second + '</div>';
        else
            xmlStr += '<div>' + minutes + ':' + second + '</div>';

        '<match id="' +
        req.params.id +
            '" name="' +
            match.doc[0].data.match.teams.home.abbr +
            " - " +
            match.doc[0].data.match.teams.away.abbr +
            '" time = "' +
            minutes +
            ': ' + second + '" score = "' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '"  >' +
            "</match></body></html>";

        res.set("Content-Type", "text/html");
        res.status(200).send(xmlStr);
        //console.log(body);


    }).catch(function(error) {
        if (error.response) {
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log(error.message);
        }
        console.log(error.config);
    });



    // var options = {
    //     url: "https://lmt.fn.sportradar.com/common/tr/Etc:UTC/gismo/match_info/" +
    //         req.params.id,
    //     headers: {
    //         "accept": "*/*",
    //         "accept-language": "en-US,en;q=0.9,tr;q=0.8",
    //         "sec-fetch-dest": "empty",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "cross-site",
    //         "Referer": "https://www.nesine.com/",
    //         "Referrer-Policy": "strict-origin-when-cross-origin",
    //         "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
    //     }
    // };

    // request.get(options, function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         //console.log(body)
    //         const match = JSON.parse(body);
    //         //console.log(match.doc[0].event);

    //         if (match.doc[0].event == 'exception') {
    //             res.status(200).send("Maç Bulunmadı");
    //             return;
    //         }
    //         let unix_timestamp = match.doc[0].data.match.ptime;
    //         var then = new Date(unix_timestamp * 1000);
    //         var now = new Date();


    //         var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
    //         var d = moment.duration(ms);

    //         var minutes = d.minutes();
    //         var second = d.seconds();
    //         if (match.doc[0].data.match.p == "2")
    //             minutes += 45;





    //         // console.log(" m: " +minutes + " start: "+ format_time(match.doc[0].data.match._dt.uts) + " current: " + format_time(match.doc[0].data.match.ptime) );
    //         var xmlStr =
    //             '<html><head> <meta http-equiv="refresh" content="1"> </head><body>' +
    //             '<div>' + match.doc[0].data.match.teams.home.abbr + ' - ' + match.doc[0].data.match.teams.away.abbr + '</div>' +
    //             '<div>' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '</div>';
    //         if (second < 10)
    //             xmlStr += '<div>' + minutes + ': 0' + second + '</div>';
    //         else
    //             xmlStr += '<div>' + minutes + ': ' + second + '</div>';

    //         '<match id="' +
    //         req.params.id +
    //             '" name="' +
    //             match.doc[0].data.match.teams.home.abbr +
    //             " - " +
    //             match.doc[0].data.match.teams.away.abbr +
    //             '" time = "' +
    //             minutes +
    //             ': ' + second + '" score = "' + match.doc[0].data.match.result.home + ':' + match.doc[0].data.match.result.away + '"  >' +
    //             "</match></body></html>";

    //         res.set("Content-Type", "text/html");
    //         res.status(200).send(xmlStr);
    //         //console.log(body);
    //     } else if (error) {
    //         res.status(200).send(error);
    //     }
    // });





});


module.exports = router;