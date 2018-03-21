#!/usr/bin/env node
/* eslint-disable no-console */
const { OAuth2Client } = require('google-auth-library');
const { readFileSync, writeFileSync } = require('fs');
const { createInterface } = require('readline');
const opn = require('opn');

async function tokens() {
  const secret = JSON.parse(readFileSync('client_secret.json'));

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
  secret.tokens = response.tokens;

  writeFileSync('client_secret.json', JSON.stringify(secret, null, 2));

  console.log('Done');
}

tokens().catch(console.error);
