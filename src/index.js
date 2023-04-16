import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {BrowserView, MobileView} from 'react-device-detect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<BrowserView>
			<App />
		</BrowserView>
		<MobileView>
			<h1 style={{color: "black"}}>
				Мобильная версия сайта находится в разработке. Приносим извинения за ожидание.
			</h1>
		</MobileView>
	</BrowserRouter>
);