import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { actionGetGameInfo } from '../redux/actions/gameinfoaction'
import { useParams } from 'react-router-dom'
import '../Styles/PokemonPage.css'

function GameIndices() {
    const { name } = useParams()
    const dispatch = useDispatch()
    const gameData = useSelector(state => state.game_indices)
    console.log(gameData)

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.game_indices)
                dispatch(actionGetGameInfo(data.game_indices))
            })
        }, [])

    return (
        <div class='d-flex'>
            <div className='title-game'>
            <img class='Gameboy' src='/Images/gameboy.png'/>GAMES THAT THIS POKEMON IS IN:
            </div>
            {gameData.map(game => {
                return(
                <div class='games-container'>
                    <div class='indivual-games'>
                        <div class='games'>Pokemon {game.version.name}</div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default GameIndices