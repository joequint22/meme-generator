import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
	// SIDE EFFECTS IN REACT JS
	useEffect(() => {
		console.log('Effect Ran');

		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((results) => setAllMemes(results.data.memes));
	}, []);

	const [allMemes, setAllMemes] = useState([]);

	const [memeImage, setMemeImage] = useState({
		topText: '',
		bottomText: '',
		//Defaulted to Ned Stark Meme 
		randomImage: 'https://i.imgflip.com/1bij.jpg',
	});

	function getRandomMeme() {
		const randomNumber = Math.floor(Math.random() * allMemes.length);
		const url = allMemes[randomNumber].url;
		console.log(url);
		setMemeImage((prevMeme) => {
			return {
				...prevMeme,
				randomImage: url,
			};
		});
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setMemeImage((oldMeme) => {
			return {
				...oldMeme,
				[name]: value,
			};
		});
	}

	return (
		<div className="container" style={{ display: 'grid', backgroundColor: 'black', textAlign: 'center', zIndex: -1 }}>
			<div className='title--container'>
				<h1 style={{ alignSelf: 'center', color: 'white', margin: '0' }}>MEME GENERATOR</h1>
			
			<button 
			id="button"
			style={{  height: 50, outlineColor: 'none', color: 'white' , backgroundColor: 'gray', justifySelf: 'center', width: '30' }} onClick={getRandomMeme}>
						New Meme!
			</button>
			</div>


			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div 
				style={{ 
					justifySelf: 'center;',
					zIndex: '1',
					width: '80%',
					fontFamily: "Impact",
					position: 'absolute',
					top: 265,
					fontSize: 30,
					fontWeight: 500,
					color: 'white' }}>
					{memeImage.topText}
				</div>

				<div
					style={{
						zIndex: '1',
						position: 'absolute',
						top: 510,
						fontSize: 30,
						fontFamily: "Impact",
						color: 'white',
            			fontWeight: 500,
					}}
				>
					{memeImage.bottomText}
				</div>

				<div className="memeImage--container" style={{ position: 'relative'}}>
					<img
						style={{ width: '80%', height: '40vh', borderRadius: '5px' }}
						src={memeImage.randomImage}
						alt='memes'
					/>
				</div>
			</div>

			<div
				className='input--fields'
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					justifySelf: 'center',
					width: "80%",
					bottom: 7,
				}}
			>
				<input
					style={{ marginTop: 10 }}
					name='topText'
					onChange={handleChange}
					value={memeImage.topText}
				/>
				<input
					style={{ marginTop: 20 }}
					name='bottomText'
					onChange={handleChange}
					value={memeImage.bottomText}
				/>
				
			</div>
		</div>
	);
}

export default App;
