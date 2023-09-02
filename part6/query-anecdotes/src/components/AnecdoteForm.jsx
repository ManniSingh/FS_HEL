import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnec } from '../requests'
import NotifyContext from '../NotifyContext'
import { useContext } from 'react'


const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData({ queryKey: ['anecs'] })
      queryClient.setQueryData({ queryKey: ['anecs'] }, anecs.concat(newAnec))
    }
  })
  const [notification, NotifyDispatch] = useContext(NotifyContext)
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote:'+content)
    if (content.length < 5){
      NotifyDispatch('Input must be at least 5 characters long.')
    }
    else{
      newAnecMutation.mutate(asObject(content))
      NotifyDispatch(content)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
