import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './Components/SearchBar'
import Gallery from './Components/Gallery/Gallery'
import AlbumView from './Components/Views/AlbumView'
import ArtistView from './Components/Views/ArtistView'


function App() {
  const[search,setSearch] = useState('')
  const [message,setMessage] = useState('Search for Music')
  const [data,setData] = useState([])

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        const url = encodeURI(`https://itunes.apple.com/search?term=${search}`)
        const response = await fetch(url)
        const data = await response.json()
  
        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setData([])
          setMessage('Not Found')
        }
      }
  
      fetchData()
    } else {
      if (data) setData([])
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <SearchBar handleSearch={handleSearch}/>
              <Gallery data={data} />
            </>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;