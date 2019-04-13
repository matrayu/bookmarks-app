import React from 'react';

const BookmarkContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmarks: () => {},
})

export default BookmarkContext