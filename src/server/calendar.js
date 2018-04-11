const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const config = require('./config');

const calendar = google.calendar('v3');
const installed = config.get('installed');
const tokens = config.get('tokens');

const client = new OAuth2Client(
  installed.client_id,
  installed.client_secret,
  installed.redirect_uris[0]
);
client.setCredentials(tokens);

exports.events = async (id, date = Date.now()) => {
  const timeMin = new Date(date);
  timeMin.setHours(0, 0, 0, 0);

  const timeMax = new Date(date);
  timeMax.setHours(23, 59, 59, 59);

  const options = {
    auth: client,
    calendarId: id,
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

  const items = data.items
    .filter(item => item.status === 'confirmed')
    .filter((item) => {
      if (item.organizer && item.organizer.self) return true;
      if (item.attendees && item.attendees.some(attendee => attendee.self)) {
        return item.attendees.find(attendee => attendee.self).responseStatus === 'accepted';
      }
      return true;
    });

  return {
    name: data.summary,
    events: items.map(item => ({
      id: item.id,
      name: item.summary || (item.visibility === 'private' ? 'busy' : '(No title)'),
      href: item.htmlLink,
      start: item.start.dateTime,
      end: item.end.dateTime,
      created: item.created || item.updated,
      creator: item.creator ? item.creator.email : null,
      organizer: item.organizer ? item.organizer.email : null,
      conference: item.conferenceData ? item.conferenceData.conferenceId : null,
      attendees: item.attendees ? item.attendees
        .filter(attendee => !attendee.resource)
        .map(attendee => attendee.email) : null,
      recurring: item.recurringEventId
    }))
  };
};
