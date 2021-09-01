import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../Styles/PokemonPage.css'
import Aos from 'aos';
import Evolution from './Evolution';
import { useDispatch } from 'react-redux'
import { actionGetGameInfo } from '../redux/actions/gameinfoaction'


function PokemonPage() {
    const { name } = useParams()
    const [searchResults, setSearchResults] = useState(null)
    const [evolutionData, setEvolutionData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        Aos.init({ duration:2000 });
    }, [])


    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data) 
                console.log(data.game_indices)
                dispatch(actionGetGameInfo(data.game_indices))
                return fetch(data.species.url).then(res => res.json())
            })
            .then(speciesdata => {
                return fetch(speciesdata.evolution_chain.url).then(res => res.json())
            })
            .then(data => {
                setEvolutionData(data.chain)
            })
    }, [name])

    return (
        <div>
            {searchResults && (
            <div>
                <div>
                    <ul class='nav-links'>
                        <li><a class='Home-link' href='/'>Home</a></li>
                        <li><a class='Pokeball-link' href='/pokeball'>Pokeball</a></li>
                    </ul>
                </div>
                <div data-aos='fade-up' className='container'>
                    <img className='poke-img' src={searchResults.sprites.other['official-artwork'].front_default} width='200px' />
                </div>
                <div className='name-container'>
                    <div className='name typewrite'>{searchResults.name}</div>
                </div>
                    <div className='type-container'>  
                        <div className='tpye'>TYPE</div>
                        {searchResults.types.map(result => {
                            return(
                            <div>
                                <div className='actual-type'>{result.type.name}</div>
                            </div>
                            )
                    })}
                    <div className='evolution-container'>
                        <div className='evolution'>EVOLUTIONS</div>
                        <Evolution data={evolutionData}/>
                    </div>
                <div className='abilities-container'>
                    <div className='abilities'>ABILITIES</div>
                    {searchResults.abilities.map(result => {
                        return(
                        <div>
                            <div className='actual-abilities'>{result.ability.name}</div>
                        </div>
                        )
                    })}
                <div className='moves'>MOVES</div>
                    <div className='moves-container'>
                    {searchResults.moves.map(result => {
                        return(
                            <div>
                                <div className='actual-moves'>○    {result.move.name}   ○</div>
                            </div>
                        )
                    })}
                </div>
                <div className='wdiky-container'>
                    {/* <a href='/gameinfo' className='wdiky'>WHERE DO I KNOW YOU FROM?</a> */}
                    <Link to={`/gameinfo/${name}`} className='wdiky'>WHERE DO I KNOW YOU FROM?</Link>
                </div>
                </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default PokemonPage
