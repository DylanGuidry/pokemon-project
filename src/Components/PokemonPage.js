import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../Styles/PokemonPage.css'
import Evolution from './Evolution';
import { useDispatch } from 'react-redux'
import { actionGetGameInfo } from '../redux/actions/gameinfoaction'


function PokemonPage() {
    const { name } = useParams()
    const [searchResults, setSearchResults] = useState(null)
    const [evolutionData, setEvolutionData] = useState(null)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("This Pokemon does not exist! Please try again.");
                }
                return res.json();
            })
            .then(data => {
                let pokemonType = data.types[0].type.name;
                document.body.classList = [];
                document.body.classList.add(pokemonType);
                setSearchResults(data);
                console.log(data);
                dispatch(actionGetGameInfo(data.game_indices));
                return fetch(data.species.url).then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch the species data.");
                    }
                    return res.json();
                });
            })
            .then(speciesdata => {
                return fetch(speciesdata.evolution_chain.url).then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch the evolution data.");
                    }
                    return res.json();
                });
            })
            .then(data => {
                setEvolutionData(data.chain);
            })
            .catch(error => {
                console.error("An error occurred:", error);
                setError(error.toString());
            });
    }, [name]);
    



    if (error) {
        return (
            <div className='error'>{error}</div>
        )
    }

    return (
        <div>
            {searchResults && (
            <div>
                <div>
                    <ul className='nav-links'>
                        <li><a className='Home-link' href='/'>Home</a></li>
                        <li><a className='Pokeball-link' href='/pokeball'>Pokeball</a></li>
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
                        <Evolution data={evolutionData} searchResults={searchResults}/>
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
                <div className='stats'>STATS</div>
                    <div className='stats-container'>
                        {searchResults.stats.map(result => {
                            return(
                                <div style={{display: 'flex',
                                            justifyContent: 'center'}}>
                                    <p className='actual-stats stat-name'>{result.stat.name.split('-').join(' ').toUpperCase()}:</p>
                                    <p className='actual-stats'>{result.base_stat}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
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
            )}
        </div>
    )
}

export default PokemonPage
