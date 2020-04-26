import React, {Component} from 'react'
import './App.css'
import MainContainer from './components/MainContainer';
import Favorites from './components/Favorites'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      characters: [],
      favorites: []
    }
  }

  addToFavorites = (character) => {
    if (!this.state.favorites.find(charac => charac.id === character.id)) {
      this.setState({ favorites: [...this.state.favorites, character] })
    }
  }

  removeFavorite = (character) => {
    let newFavorites = this.state.favorites.filter(fav => fav !== character)
    this.setState({favorites: newFavorites})
  }

  componentDidMount(){
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(res => this.setState({
        characters: res.results
      }))
  }

  render(){
    return(
      <div className='App'>
        <Favorites favorites={this.state.favorites} removeFavorite={this.removeFavorite}/>
        <h1>Rick and Morty Characters</h1>
        <MainContainer characters={this.state.characters} addToFavorites={this.addToFavorites}/>
      </div>
    )
  }
}