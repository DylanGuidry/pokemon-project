import {
  BrowserRouter as Router,
  StaticRouter,
  Route,
  Switch
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import PokemonPage from "./Components/PokemonPage";
import Pokeball from "./Components/Pokeball";
import './Styles/App.css';
import { useRef } from 'react'
import GameIndices from "./Components/GameIndices";

function App() {

  const constraintsRef = useRef(null)

  return (
      <div className ='App' ref={constraintsRef}>
        <Router>
          <div className= 'content'>
          <Switch>
            <Route exact path='/' >
              <Homepage />
            </Route>
            <Route path='/pokemon/:name'>
              <PokemonPage/>
            </Route>
            <Route path='/pokeball'>
              <Pokeball constraintsRef={constraintsRef}/>
            </Route>
            <Route path='/gameinfo/:name'>
              <GameIndices/>
            </Route>
          </Switch>
          </div>
        </Router>
      </div>
  );
}

export default App;
