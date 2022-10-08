module.exports = (logger, functions) => {
    const express = require('express');
    const router = express.Router();

    // Get meritve splošno mora biti vedno parametrično - osnovni filter
    router.post('/get-settings', (req, res) => {
        functions.getSettings(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }
            res.send(result.settings);
        });
    });
    router.post('/set-settings', (req, res) => {
        functions.setSettings(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }

            if (result.responseCode === 200) {
                functions.getSettings().then(result => {
                    if (result.responseCode === 500) {
                        res.status(500).send(result.message);
                        return;
                    }

                    if (result.responseCode === 200) {
                        res.send(result.settings);
                    }
                });
            }
        });
    });

    return router;
};