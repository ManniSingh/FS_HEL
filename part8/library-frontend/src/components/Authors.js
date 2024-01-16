import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  if (result.loading) {
    return <div>loading...</div>
  }
  // if (!props.show) {
  //   return null
  // }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({
      variables: { name, born: parseInt(born) },
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
      <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}>
              {authors.map((a) => (<option key={a.name} value={a.name}>{a.name}</option>))}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>      
      </div>

    </div>
  )
}

export default Authors
