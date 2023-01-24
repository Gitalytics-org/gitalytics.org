import { Application, Request, Response } from "express";

module.exports = function (app: Application) {

    app.get('/', function (req: Request, res: Response) {
        res.send('Guten Tag, API am Hörer. Wie kann ich Ihnen weiterhelfen?');
    });

}