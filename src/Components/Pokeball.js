import React from 'react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

function Pokeball(props) {

    return (
            <motion.div
                style = {{
                    width: 100,
                    height: 100,
                    backgroundColor: 'white',
                    borderRadius: '100%',
                    position: 'absolute',
                    top: 'calc(50% - 50px)',
                    left: 'calc(50% - 50px)'
                }}
                drag
                dragConstraints={props.constraintsRef}
            ><img src='/Images/pokeball-toss.png' style= {{
                width: '100%',
                pointerEvents: 'none',
            }}/></motion.div>
    )}


    export default Pokeball
