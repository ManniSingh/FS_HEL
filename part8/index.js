const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book,
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root , args) => {
        let filtered = books
        if (args.author && args.genre) {
          filtered = books.filter((book) => book.author === args.author && book.genres.includes(args.genre))
          return filtered.map((book) => ({ title: book.title, author: book.author }))
        } else if (args.author) {
            filtered = books.filter((book) => book.author === args.author)
            return filtered.map((book) => ({ title: book.title }))
        } else if (args.genre) {
            filtered = books.filter((book) => book.genres.includes(args.genre))
            return filtered.map((book) => ({ title: book.title, author: book.author }))
        }
        return filtered
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
      }

      books.push(newBook)
      const author = authors.find((author) => author.name === args.author)

      if (!author) {
        authors.push({ name: args.author })
      }
      return { title: newBook.title, author: newBook.author }
    },
    editAuthor: (root, args) => {
        const author = authors.find((author) => author.name === args.name)
  
        if (author) {
          author.born = args.setBornTo
          return { name:author.name, born:author.born }
        }
  
        return null
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})