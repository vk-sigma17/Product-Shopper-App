import React from 'react'
import ProductList from './components/ProductList'

//LIMITATIONS
//1.Currently, error handling is minimal. If an API call fails, the app displays a simple error message.
//2.No detailed loading indicators
//3.search is case-insensitive, but it may not handle special characters or whitespace effectively
//4.No Debouncing: As the user types in the search input, each keystroke triggers a state update.
//Single Api Source

function App() {
  return (
    <div>
      <ProductList />
    </div>
  )
}

export default App
