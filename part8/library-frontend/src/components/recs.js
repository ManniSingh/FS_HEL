import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`
const GENRE = gql`
    query {
        me {
            favoriteGenre
        }
    }
`
const Recs = (props) => {
    const genre = useQuery(GENRE)
    // console.log(genre)
    // const favorite = genre.data.me.favoriteGenre
    // const result = useQuery(ALL_BOOKS, {
    //     variables: { genre: favorite }
    //   })
    const result = useQuery(ALL_BOOKS, {
        variables: { genre: genre.data?.me?.favoriteGenre || '' },
      })
    if (genre.loading || result.loading) {
    return <div>loading...</div>
    }
    const books = result.data.allBooks
    console.log(books)
    return (
        <div>
          <h2>books</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
}
  
export default Recs