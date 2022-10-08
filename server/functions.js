const Q = require("q");

const async = require("async");
const WebSocketServer = require("ws");


module.exports = (logger, settings) => {
    let cidAddOn = 0;
    let cid;

    // MYSQL localhost Data
    let mySql = require('mysql');
    let connectionPool = mySql.createPool(settings.dbSettings);
    let connection = mySql.createConnection(settings.dbSettings);

    // Twister product data
    let async = require('async');


    const wss = new WebSocketServer.Server({port: 9001});
    let x = "x-os";
    let y1 = "y1-os";
    let y2 = "y2-os";
    let z = "z-os";
    let silaData = "sila";
    let buttons = "off";
    let adminActive = false;
    let bump = false;


    wss.on("connection", ws => {
        // sending message
        ws.on("message", data => {
            console.log(`Client has sent us: ${data}`)
        });

        // move this from here to functions and make it request based
        setInterval(sendWebSocketInformation, 500);
        function sendWebSocketInformation() {
            ws.send(JSON.stringify({
                x: x,
                y1: y1,
                y2: y2,
                z: z,
                sila: silaData,
                buttons: buttons,
                adminActive: adminActive,
                bump: bump,
            }))
        }
    });

    let functions = {
        getCid: () => {
            cid = new Date().getTime().toString() + cidAddOn.toString();
            this.cidAddOn = this.cidAddOn + 1;
            if (this.cidAddOn > 1000) this.cidAddOn = 0;
            return cid;
        },
        writeLog: (type, app, direction, action, message) => {

            let jsonMessage = {
                cid: cid,
                type: type,
                app: app || "[NO app]",
                direction: direction || "[NO direction]",
                action: action || ["NO action"],
                message: message || ["NO message"]
            };

            if (settings.logToFile && settings.logToFile === true) {
                switch (type) {
                    case "info":
                        logger.info(JSON.stringify(jsonMessage));
                        break;
                    case "error":
                        logger.error(JSON.stringify(jsonMessage));
                        break;
                }
            }
        },


        getSettings: () => {
            let Q = require("q");
            let dfd = Q.defer();
            connectionPool.getConnection((error, connection) => {
                if (error) dfd.resolve({responseCode: 500, message: "Database error while trying to getSettings"});
                connectionPool.query(
                    'SELECT * FROM ursa.nastavitve',
                    (error, result) => {
                        if (connection) connection.release();
                        if (error) dfd.resolve({responseCode: 500, message: "Database error."});
                        dfd.resolve({responseCode: 200, settings: result.length === 0 ? [] : result});
                    }
                );
            });
            return dfd.promise;
        },
        setSettings: (data) => {
            let Q = require("q");
            let dfd = Q.defer();
            connectionPool.getConnection((error, connection) => {
                if (error) dfd.resolve({
                    responseCode: 500,
                    message: "Database error while trying to posodobiZaposlenega"
                });
                let connectionPoolQuery = "UPDATE `ursa`.`nastavitve` SET `tolerance_debeline` = ?, `tolerance_dolzine` = ?, `tolerance_sirine` = ?, `tolerance_gostote` = ?, `merilne_tocke` = ?, `dolzina_merilnih_tock` = ? WHERE (`Id` = 0);";
                let connectionPoolQueryParameters = [
                    data.tolerance_debeline,
                    data.tolerance_dolzine,
                    data.tolerance_sirine,
                    data.tolerance_gostote,
                    data.merilne_tocke,
                    data.dolzina_merilnih_tock,
                ];

                connectionPool.query(
                    connectionPoolQuery,
                    connectionPoolQueryParameters,
                    (error, result) => {
                        if (connection) connection.release();
                        if (error) dfd.resolve({responseCode: 500, message: "Database error at setSettings."});
                        dfd.resolve({responseCode: 200, settings: result})
                    }
                );
            });
            return dfd.promise;
        },

    };
    return functions;
};
