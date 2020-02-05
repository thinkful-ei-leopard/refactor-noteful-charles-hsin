import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NotefulContext from '../NotefulContext'

export default function Note(props) {
  
  console.log(props.handleDelete);
  return (
    <div className='Note'>
       <NotefulContext.Consumer>
         {()=>(<div>
    <h2 className='Note__title'>
        
    <Link to={`/note/${props.id}`}>
      {props.name}
      </Link>
  </h2>
  
  <button className='Note__delete' type='button' onClick={(event) =>props.handleDelete(event, props.id)}>
    <FontAwesomeIcon icon='trash-alt' />
    {' '}
    remove
  </button>
  
  
  <div className='Note__dates'>
    <div className='Note__dates-modified'>
      Modified
      {' '}
      <span className='Date'>
        {format(props.modified, 'Do MMM YYYY')}
      </span>
     
    </div>
  </div>
  </div>
  )}
  </NotefulContext.Consumer>
  </div>
  )
}
