import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Homepage.css';

function Homepage() {
    const [searchInput, setsearchInput] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const history = useHistory()

    const handleSumbmit = (e) => {
        e.preventDefault()
        history.push(`/pokemon/${searchInput.toLowerCase()}`)
    }
    console.log(searchResults)

    return (
        <>
            <div class='searchBox'>
                <button onClick={handleSumbmit} class='searchButton' type='submit'><img src='/Images/pokeball.gif' width='30px' /></button>
                <input class='searchInput' value={searchInput} onChange={(e) => setsearchInput(e.target.value)} type='text' name='' placeholder='Press the Poké Ball...'></input>
            </div>
        </>
    )
}

export default Homepage
