import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecs, updateAnec } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  // fetching all
  const result = useQuery({
    queryKey: ['anecs'],
    queryFn: getAnecs,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log('Result:'+JSON.parse(JSON.stringify(result)))

  const updateAnecMutation = useMutation(updateAnec, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecs'] })
    },
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not availaible due to problems in the server.</div>
  }

  const anecdotes = result.data.sort((a, b) => b.votes-a.votes)

  const toggleImportance = (note) => {
    
  }

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
