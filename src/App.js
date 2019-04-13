import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { Route } from 'react-router-dom';
=======
import { Route } from 'react-router-dom'
>>>>>>> b3878d5a0cf7b7277fa3cdf10e2af717380c1753
=======
import { Route } from 'react-router-dom';
>>>>>>> context-startingpoint
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarkContext from './BookmarkContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
<<<<<<< HEAD
    bookmarks,
=======
    bookmarks: [],
>>>>>>> context-startingpoint
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
<<<<<<< HEAD
    const { bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route 
            path='/add-bookmark'
            render={({ history }) => {
<<<<<<< HEAD
              console.log(history)
=======
>>>>>>> b3878d5a0cf7b7277fa3cdf10e2af717380c1753
              return (
                <AddBookmark
                  onAddBookmark={this.addBookmark}
                  onClickCancel={() => history.push('/')}
                />
<<<<<<< HEAD
              )}
            }
          />
          <Route
            exact
            path='/'
=======
              )
            }}
          />
          <Route
            exact path='/'
>>>>>>> b3878d5a0cf7b7277fa3cdf10e2af717380c1753
            render={() =>
              <BookmarkList
                bookmarks={bookmarks}
              />
            }
          />
        </div>
=======
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarkContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route 
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
          </div>
        </BookmarkContext.Provider>
        
>>>>>>> context-startingpoint
      </main>
    );
  }
}

export default App;
