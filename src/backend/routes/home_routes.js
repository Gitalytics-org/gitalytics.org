module.exports = function (app, connection) {

    app.get('/', function (req, res) {
        res.send('Guten Tag, API am H�rer. Wie kann ich ihnen weiterhelfen?');
    });

}