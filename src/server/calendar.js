const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const secret = require('../../config/client_secret');
const tokens = require('../../config/tokens');

const client = new OAuth2Client(
  secret.installed.client_id,
  secret.installed.client_secret,
  secret.installed.redirect_uris[0]
);

client.setCredentials(tokens);

const calendar = google.calendar('v3');

async function events(id, date = Date.now()) {
  const timeMin = new Date(date);
  timeMin.setHours(0, 0, 0, 0);

  const timeMax = new Date(date);
  timeMax.setHours(23, 59, 59, 59);

  const options = {
    auth: client,
    calendarId: encodeURIComponent(id),
    singleEvents: true,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    timeZone: 'Etc/UTC',
    orderBy: 'startTime'
  };

  const data = await new Promise((resolve, reject) => {
    calendar.events.list(options, (error, response) => {
      if (error) reject(error);
      else resolve(response.data);
    });
  });

  return {
    name: data.summary,
    events: data.items.map(item => ({
      id: item.id,
      name: item.summary || (item.visibility === 'private' ? 'busy' : '(No title)'),
      href: item.htmlLink,
      start: item.start.dateTime,
      end: item.end.dateTime
    })),
    ...data // TODO Remove
  };
}

module.exports = { events };
