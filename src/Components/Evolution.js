import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/PokemonPage.css'

function Evolution({data, searchResults}) {
    if (!data){
        return ''
    }
    return (
        <ul className='list-evolution-container'>
            <li className='list-evolution'>
                <Link class='evo-links' to={`/pokemon/${data.species.name}`}><img src='/Images/Candy.png' width='50px'/>
                {data.species.name}
                </Link>
                {data.evolves_to.map((evolution) => {
                    return <Evolution data = {evolution}/>
                })}
            </li>
        </ul>
    )
}

export default Evolution
