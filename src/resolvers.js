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
    addReview: async (_, args) => {
        try {
            let response = await Review.create(args);
            return response;
        } catch(e) {
            return e.message;
        }
    }
  }
};


/*
       try {
        const email = await user; // catching the reject from the user promise.
        const review = await Review.create({
          title: title,
          average_rating: average_rating,
          eventId: eventId
        });

        return review;
       } catch(e) {
           throw new AuthenticationError('You must be logged in to do this');
       }
*/