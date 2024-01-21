import { useNotesContext } from '../hooks/useNotesContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NoteDetails = ({ note }) => {
  const { dispatch } = useNotesContext()

  const handleClick = async () => {
    const response = await fetch('/api/notes/' + note._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_NOTE', payload: json})
    }
  }

  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <p><strong>Section: </strong>{note.section}</p>
      <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default NoteDetails