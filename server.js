const express = require('express');
const app = express();

const forceSSL = function() {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
}

const path = require ('path');

app.use(forceSSL());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 8080);