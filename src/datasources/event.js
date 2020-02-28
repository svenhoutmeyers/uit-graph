const { RESTDataSource } = require('apollo-datasource-rest');

class EventAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://search-test.uitdatabank.be/';
  }

  async getAllEvents() {
    const response = await this.get('events', { 
      apiKey: 'bfbbc89a-70fe-4c46-aabc-e0985c9a7a57', 
      embed : 'true' 
    });
    let json = JSON.parse(response);
    return Array.isArray(json.member)
      ? json.member.map(event => this.eventReducer(event))
      : [];
  }

  eventReducer(event) {
    return {
      id: event['@id'].split('/').pop(),
      name: event.name.nl,
      description: event.description && event.description.nl,
      address: {
        addressCountry: event.location.address.nl.addressCountry,
        addressLocality: event.location.address.nl.addressLocality,
        postalCode: event.location.address.nl.postalCode,
        streetAddress: event.location.address.nl.streetAddress,
      },
      calendarSummary: event.calendarSummary,
    };
  }
  
  async getEventById({ eventId }) {
    const response = await this.get('events', { 
      apiKey: 'bfbbc89a-70fe-4c46-aabc-e0985c9a7a57', 
      embed : 'true',
      id: eventId 
    });
    let json = JSON.parse(response);
    return this.eventReducer(json.member[0]);
  }


}

module.exports = EventAPI;