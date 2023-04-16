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
		<MobileView style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
			<h1 style={{color: "#626d7a", textAlign: "center", lineHeight: "22px", fontSize: "20px"}}>
				Мобильная версия сайта находится в разработке. Приносим извинения за ожидание.
			</h1>
		</MobileView>
	</BrowserRouter>
);