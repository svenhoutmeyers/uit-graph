module.exports = {
  Query: {
    events: (_, __, { dataSources }) =>
      dataSources.eventAPI.getAllEvents(),
    event: (_, { id }, { dataSources }) =>
      dataSources.eventAPI.getEventById({ eventId: id })
  }
};