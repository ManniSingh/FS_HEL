
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book =  require('./models/book')
const User = require('./models/user')

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let query = {}
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          query.author = author._id
        }
        if (args.genre) {
          query.genres = args.genre
        }
        const books = await Book.find(query).populate('author')
        return books
      },
      allAuthors: async () => await Author.find(),
      me: (root, args, context) => {
        //console.log(context)
        return context.currentUser
      }
    },
    Author: {
      bookCount: async (root) => {
        const count = await Book.countDocuments({ author: root._id })
        return count
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        //console.log(currentUser)
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        let author
        try {
          author = await Author.findOne({ name: args.author })
          if (!author) {
            author = new Author({ name: args.author})
            await author.save()
          }
  
          const newBook = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: author._id
          })
  
          await newBook.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: newBook.populate('author')}) 
          return newBook.populate('author')
        } catch (error) {
            let messages = 'Error'
            if (error.name === 'ValidationError') {
              messages = Object.values(error.errors).map((validationError) => validationError.message)
            }
            else {
              messages = error
            }
            throw new GraphQLError('Adding book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                messages,
              },
            })
        }
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        try {
          const author = await Author.findOne({ name: args.name })
          if (author) {
            author.born = args.setBornTo
            await author.save()
            return author
          }
  
          return null;
        } catch (error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error,
            },
          })
        }
      },
      createUser: async (root, args) => {
        try {
          const existingUser = await User.findOne({ username: args.username })
          if (existingUser) {
            throw new GraphQLError('Username is already in use', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            })
          }
  
          const newUser = new User({
            username: args.username,
            favoriteGenre: args.favoriteGenre,
          })
          await newUser.save()
          return newUser
        } catch (error) {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              error,
            },
          })
        }
      },
      login: async (root, args) => {
  
        try {
          const user = await User.findOne({ username: args.username })
  
          if (!user || args.password !== 'admin') {
            throw new GraphQLError('Invalid credentials', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            })
          }
          const userForToken = {
            username: user.username,
            id: user._id,
          }
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        } catch (error) {
          throw new GraphQLError('Login failed', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              error,
            },
          })
        }
      },    
    }

  }

  module.exports = resolvers