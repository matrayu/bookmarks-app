import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
import { Link } from 'react-router-dom';
/* import config from '../config'; */
import './BookmarkItem.css';

const { API_TOKEN, API_ENDPOINT } = require('../config')

function deleteBookmarkRequest(bookmarkId, callback) {
  //console.log('delete', bookmarkId, callback);
  console.log(`${API_ENDPOINT}/${bookmarkId}`);
  fetch(`${API_ENDPOINT}/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${API_TOKEN}` 
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
    })
    .catch(error => {
      console.log(error)
    })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <Link to={`edit/${props.id}`}>Update</Link>
            <button
              className='BookmarkItem__delete'
              onClick={() => {
                deleteBookmarkRequest(props.id,context.deleteBookmark)
              }}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}
