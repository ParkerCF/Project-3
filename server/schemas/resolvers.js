const { AuthenticationError } = require("apollo-server-express");
const { Profile, Product } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    product: async (parent, { productId }) => {
      console.log(productId);
      const results = await Profile.findOne({
        products: { $elemMatch: { _id: productId } },
      });
      return results.products.find((product) => product._id == productId);
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const profile = await Profile.findOne({ _id: context.user._id });
        console.log(profile);
        return profile;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addProduct: async (parent, { profileId, product }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      console.log(product);
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { products: product },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },

    updateProduct: async (parent, { profileId, name, product }) => {
      console.log(profileId);
      if (profileId) {
        const user = await Profile.findById(profileId);
        if (!user) {
          throw new AuthenticationError('No profile found with this id');
        }

        // Find the product to be updated
        const productToUpdate = user.products.find(
          (prod) => prod.name === name
        );

        if (!productToUpdate) {
          throw new AuthenticationError('No product found with this name for this user');
        }

        // Update the product
        Object.assign(productToUpdate, product);

        await user.save();
        return user;
      }

      throw new AuthenticationError('You need to be logged in to perform this action');
    },



    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Make it so a logged in user can only remove a skill from their own profile
    removeProduct: async (parent, { productId }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { products: { _id: productId } } }, //match name and remove the skill
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
