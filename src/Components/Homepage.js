import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Homepage.css';

function Homepage() {
    const [searchInput, setsearchInput] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const history = useHistory()

    const handleSumbmit = (e) => {
        // console.log("Fired")
        // e.preventDefault()
        history.push(`/pokemon/${searchInput.toLowerCase()}`)
    }
    console.log(searchResults)

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            // alert('Enter Clicked')
            handleSumbmit()
        }
    }


    return (
        <>
            <div className='searchBox'>
                <button onSubmit={handleSumbmit} class='searchButton' type='submit'><img src='/Images/pokeball.gif' width='30px' /></button>
                <input className='searchInput' onKeyPress={handleKeyPress} value={searchInput} onChange={(e) => setsearchInput(e.target.value)} type='text' name='' placeholder='Search for a Pokemon...'></input>
            </div>
        </>
    )
}

export default Homepage
