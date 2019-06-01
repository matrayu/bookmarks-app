import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
/* import config from '../config'; */
import './PatchBookmark.css';
const { API_TOKEN, API_ENDPOINT } = require('../config')
const xss = require('xss');

const Required = () => (
  <span className='PatchBookmark__required'>*</span>
);

class PatchBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
    title: '',
    url: '',
    description: '',
    rating: '',
  };

  componentDidMount() {
      const bookmarkId = this.props.match.params.bookmarkId
      fetch(`${API_ENDPOINT}/${bookmarkId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
        }
      })
      .then(res => {
          if (!res.ok) {
              throw new Error(res.status)
          }
          return res.json()
      })
      .then(responseData => {
          this.setState({
            id: responseData.id, 
            title: responseData.title,
            url: responseData.url,
            description: responseData.description,
            rating: responseData.rating,   
        })
      })
      .catch(error => this.setState({ error }))
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
        id: parseInt(this.props.match.params.bookmarkId), 
        title: xss(title.value),
        url: url.value,
        description: xss(description.value),
        rating: parseInt(rating.value),
    }
    const bookmarkId = this.props.match.params.bookmarkId
    this.setState({ error: null })
    fetch(`${API_ENDPOINT}/${bookmarkId}`, {
      method: 'PATCH',
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
        return res
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.props.history.push('/')
        this.context.patchBookmark(bookmark)
      })
      .catch(error => {
        console.log(error)
        this.setState({ error })
      })
  }

  handleChange = e => {
      const { id, value } = e.target
      this.setState({ [id]: value })
  }

  render() {
    const { error, title, description, url, rating } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Update a bookmark</h2>
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
              value={title}
              onChange={this.handleChange}
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
              value={url}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleChange}
            >
            </textarea>
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              min='1'
              max='5'
              required
              value={rating}
              onChange={this.handleChange}
            />
          </div>
          <div className='PatchBookmark__buttons'>
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

export default PatchBookmark;