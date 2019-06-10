import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import './AddBookmark.css';
/* import config from '../config'; */
const { API_TOKEN, API_ENDPOINT } = require('../config')
const xss = require('xss');


const Required = () => (
  <span className='AddBookmark__required'>*</span>
);

class AddBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
  };

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: xss(title.value),
      url: url.value,
      description: xss(description.value),
      rating: parseInt(rating.value),
    }
    this.setState({ error: null })

    fetch(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${API_TOKEN}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res
            .json()
            .then(error => {
              // then throw it
              throw error
            })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = 1
        this.props.history.push('/')
        this.context.addBookmark(data)
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating{' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={1}
              min={1}
              max={5}
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddBookmark;
