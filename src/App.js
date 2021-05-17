import { useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';

const alanKey =
	'06a4eb1dc95cb6cb0105e6a7f21a4fbf2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
	const [newsArticle, setNewsArticle] = useState([]);
	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles }) => {
				if (command === 'newsHeadlines') {
					console.log(articles);
					setNewsArticle(articles);
				}
			},
		});
	}, []);
	return (
		<div>
			<h1>ALAN AI News App</h1>
			<NewsCards articles={newsArticle} />
		</div>
	);
}

export default App;
