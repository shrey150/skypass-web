const express       = require("express");
const bodyParser    = require("body-parser");
const env           = require("./env");
const NodeRSA       = require("node-rsa");
const admin         = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(env.ADMIN_SDK),
    databaseURL: "https://skyward-app.firebaseio.com"
});

const db = admin.database();
const auth = admin.auth();
const app = express();

const passwordNode = new NodeRSA();
passwordNode.importKey(env.PUBLIC_KEY, "pkcs8-public");

app.use(express.static(env.CLIENT_ROOT));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    auth.createUser({
        email: `${username}@shreypandya.com`,
        password: password
    })
    .then(userRecord => {

        res.send(userRecord);

        const hash = passwordNode.encrypt(password, "base64");
        db.ref(username + "/user_data").set({
            email: email,
            password: hash
        });

    })
    .catch(err => {
        res.send(err);
    })

});

app.listen(env.PORT, () => console.log("Server running"));