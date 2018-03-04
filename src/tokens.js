#!/usr/bin/env node
/* eslint-disable no-console,import/no-extraneous-dependencies */
const { OAuth2Client } = require('google-auth-library');
const { createInterface } = require('readline');
const { writeFileSync } = require('fs');
const opn = require('opn');

const secret = require('../config/client_secret');

async function token() {
  const client = new OAuth2Client(
    secret.installed.client_id,
    secret.installed.client_secret,
    secret.installed.redirect_uris[0]
  );

  const url = client.generateAuthUrl({
    auth_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar.readonly'
  });

  console.log('Open', url);

  opn(url, { wait: false });

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const code = await new Promise((resolve) => {
    readline.question('Code? ', (code) => {
      readline.close();
      resolve(code);
    });
  });

  const response = await client.getToken(code);

  writeFileSync(`${__dirname}/../config/tokens.json`, JSON.stringify(response.tokens, null, 2));

  console.log('Done');
}

token().catch(console.error);
