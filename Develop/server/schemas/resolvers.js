const { AuthenticationError } = require ('apollo-server-express');
const { User } = require('../models');
const ( signToken ) = require('../utils/auth');
const resolvers = { Query: { me: async (parent, args, context) => {
    if (context.user) { data = await User.findOne({ _id: context.use._id}).select('-__v -password');
    return data; }
    throw new AuthenticationError('log in boyy');
},},}