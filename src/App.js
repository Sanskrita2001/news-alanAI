import { useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './Styles'

const alanKey =
	'06a4eb1dc95cb6cb0105e6a7f21a4fbf2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
	const [newsArticle, setNewsArticle] = useState([]);
	const [activeArticles, setActiveArticles] = useState(-1)
	const classes = useStyles();
	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles,number }) => {
				if (command === 'newsHeadlines') {
					console.log(articles);
					setNewsArticle(articles);
					setActiveArticles(-1);
				} else if (command === 'highlight') {
					setActiveArticles((prevArticle)=>prevArticle+1)
				} else if (command === 'open') {
					const parsedNumber =
						number.length > 2
							? wordsToNumbers(number, { fuzzy: true })
							: number;
					const article = articles[parsedNumber - 1];
					if (parsedNumber > article.length) {
						alanBtn().playText('Please try that again...');
					} else if (article) {
						window.open(article.url, '_blank');
						alanBtn().playText('Opening...');
					} else {
						alanBtn().playText('Please try that again...');
					}
				}
			},
		});
	}, []);
	return (
		<div>
			<div className={classes.logoContainer}>
				<img
					src='https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg'
					className={classes.alanLogo}
					alt='logo'
				/>
			</div>
			<NewsCards articles={newsArticle} activeArticles={activeArticles} />
		</div>
	);
}

export default App;
