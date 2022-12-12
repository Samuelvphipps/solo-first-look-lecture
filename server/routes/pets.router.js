const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//import fence middleware
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// This route *should* return the logged in users pets
/// WE need to protect this route!!! Use conditional to authenticate, if true run this code
router.get('/', (req, res) => {

        console.log('/pet GET route');
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);

        //different access levels conditional for admin v user
        let queryText;
        let queryParams;

            queryText = `
                select * from "pets";
            `;
            queryParams=[];

        pool.query(queryText, queryParams)
            .then((result) => {
                res.send(result.rows[0].name);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });

});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, (req, res) => {
    //fence statement ⤴️ using middleware
    
        console.log('/pet POST route');
        console.log('req.body', req.body);
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText=`
        INSERT INTO "pets"
	        ("name", "user_id")
        VALUES
	        ($1, $2);
        `;

        //"user_id" comes from req.user.id
        //"name" req.body.name

        pool.query(queryText, [req.body.name, req.user.id])
            .then((dbRes)=>{
                res.sendStatus(201);
            })
            .catch(err=>{
                console.error('in post pets error', err);
                res.sendStatus(500);
            })
        // res.sendStatus(200);
    
});

module.exports = router;