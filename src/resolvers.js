const { Review } = require('./models');

module.exports = {
  Query: {
    events: (_, __, { dataSources }) =>
      dataSources.eventAPI.getAllEvents(),
    event: (_, { id }, { dataSources }) =>
      dataSources.eventAPI.getEventById({ eventId: id }),
    reviews: async () => await Review.find({}).exec()
  },
  Mutation: {
    addReview: async (_, args, { user }) => {
        try {
            const email = await user;
            let response = await Review.create(args);
            return response;
        } catch(e) {
            return e.message;
        }
    }
  }
};