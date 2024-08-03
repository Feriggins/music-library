import { useState, useEffect } from 'react'
import { useParams , Link  } from 'react-router-dom'
import NavButtons from '../Views/NavButtons';

function ArtistView() {
    const [ artistData, setArtistData ] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:3000/album/${id}`
            const response = await fetch(url)
            const data = await response.json()

            const albums = data.results.filter(item => item.collectionType === 'Album')
            console.log(albums)
            setArtistData(albums)
        }
        fetchData()
    }, [id])

    const albumDisplay = artistData.map(album  => {
        return(
            <div key={album.collectionID} >
                <Link to={`/album/${album.collectionId}`}>
                <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })


    return (
        <div>
            {NavButtons()}
            <p>Artist Data Goes Here!</p>
            <p>ID: {id}</p>
            {albumDisplay}
        </div>
    )
}

export default ArtistView