const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require('zod');

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const port = 3000;
const app = express();

app.use(express.json());

const emailCheck = zod.string().email();
const passwordCheck = zod.string().min(6);

function signJwt(username, password) {
    // const userGet = emailCheck.safeParse(username);
    // const passGet = passwordCheck.safeParse(password);
    // if (!userGet.success || !passGet.success) {
    //     return null;
    // }
    // const signin = jwt.sign({
    //     username
    // }, jwtPassword);
    // return signin;

    if (!emailCheck.safeParse(username).success || !passwordCheck.safeParse(password).success) {
        return null;
    }
    return jwt.sign({ username }, jwtPassword)
}


/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */


function verifyJwt(token) {
    let verdict = true;
    try {
        jwt.verify(token, jwtPassword)
    } catch {
        verdict = false;
    }
    return verdict;
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const decoded = jwt.decode(token);
    return decoded || false;
}


// Login route (returns JWT)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const token = signJwt(username, password);
    if (!token) return res.status(400).send("Invalid credentials");
    res.json({ token });
});

// Verify route
app.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (verifyJwt(token)) {
        res.send("Token is valid");
    } else {
        res.status(401).send("Invalid token");
    }
});

// Decode route
app.get('/decode', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    const payload = decodeJwt(token);
    if (payload) {
        res.json(payload);
    } else {
        res.status(400).send("Invalid JWT format");
    }
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})



module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}

