import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/PokemonPage.css'

function Evolution(props) {
    if (!props.data){
        return ''
    }
    return (
        <ul className='list-evolution-container'>
            <li className='list-evolution'>
                <Link class='evo-links' to={`/pokemon/${props.data.species.name}`}><img src='/Images/Candy.png' width='50px'/>
                {props.data.species.name}
                </Link>
                {props.data.evolves_to.map((evolution) => {
                    return <Evolution data = {evolution}/>
                })}
            </li>
        </ul>
    )
}

export default Evolution
