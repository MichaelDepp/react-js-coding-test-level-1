import './App.css';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import Modal from 'react-modal';

import DetailCard from './components/DetailCard';
import ThumbnailCard from './components/ThumbnailCard';

function PokeDex() {
	const [pokemons, setPokemons] = useState([]);
	const [pokemonDetail, setPokemonDetail] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon').then((response) => {
			console.log(response.data.results);
			setPokemons(response.data.results);
			setIsLoading(false);
		});
	}, []);

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			background: 'black',
			color: 'white',
		},
		overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
	};

	const onClickPokemon = (url) => {
		axios.get(url).then((response) => {
			console.log(response.data);
			setPokemonDetail(response.data);
		});
	};

	if (!isLoading && pokemons.length === 0) {
		return (
			<div>
				<header className="App-header">
					<h1>Welcome to pokedex !</h1>
					<h2>Requirement:</h2>
					<ul>
						<li>Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex, and show a list of pokemon name.</li>
						<li>Implement React Loading and show it during API call</li>
						<li>when hover on the list item , change the item color to yellow.</li>
						<li>when clicked the list item, show the modal below</li>
						<li>Add a search bar on top of the bar for searching, search will run on keyup event</li>
						<li>Implement sorting and pagingation</li>
						<li>Commit your codes after done</li>
						<li>
							If you do more than expected (E.g redesign the page / create a chat feature at the bottom right). it would
							be good.
						</li>
					</ul>
				</header>
			</div>
		);
	}

	return (
		<div>
			<header className="App-header">
				{isLoading ? (
					<>
						<div className="App">
							<header className="App-header">
								<ReactLoading />
								{/* <b>Implement loader here</b> */}
							</header>
						</div>
					</>
				) : (
					<>
						<h1>Welcome to pokedex !</h1>
						{pokemons && (
							<div className="list-container">
								{pokemons.map((pokemon, index) => (
									<ThumbnailCard onClick={() => onClickPokemon(pokemon.url)} index={index} name={pokemon.name} />
								))}
							</div>
						)}
						{/* <b key={index} onClick={() => onClickPokemon(pokemon.url)}>
							{pokemon.name}
						</b> */}
						{/* <b>Implement Pokedex list here</b> */}
					</>
				)}
			</header>
			{pokemonDetail && (
				<Modal
					isOpen={pokemonDetail}
					contentLabel={pokemonDetail?.name || ''}
					onRequestClose={() => {
						setPokemonDetail(null);
					}}
					style={customStyles}
				>
					<DetailCard detail={pokemonDetail} />
					{/* <div>
						Requirement:
						<ul>
							<li>show the sprites front_default as the pokemon image</li>
							<li>Show the stats details - only stat.name and base_stat is required in tabular format</li>
							<li>Create a bar chart based on the stats above</li>
							<li>
								Create a buttton to download the information generated in this modal as pdf. (images and chart must be
								included)
							</li>
						</ul>
					</div> */}
				</Modal>
			)}
		</div>
	);
}

export default PokeDex;
