const express = require('express')
const app = express()
const { auth } = require('express-oauth2-jwt-bearer')

const port = process.env.PORT || 8080

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
  tokenSigningAlg: 'RS256',
})

// enforce on all endpoints
app.use(jwtCheck)

app.get('/authorized', function (req, res) {
  res.send('Secured Resource')
})

app.listen(port)

console.log('Running on port ', port)
