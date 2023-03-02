import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import AppRouter from "./components/AppRouter";
import "./static/styles/base.css"
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';

const { Header, Footer } = Layout;
const infoForNavbar = ["Выбор образовательной организации",
					   "О нас",
						"Контакты",
						"Войти в LMS"];

const pathForNavbar = ["/choice_school",
					   "/about",
					   "/contacts",
					   "/auth_user"]


function App() {
	const location = useLocation();
	const [selectedKeys, setselectedKeys] = useState([""]);
	const navigate = useNavigate();

	React.useEffect(() => {
		let path = location["pathname"];
		if (!(pathForNavbar.includes(path))){
			setselectedKeys([""]);
		}
	  }, [location])

	const redirect = ({ item, key, keyPath, domEvent }) => {
		navigate(pathForNavbar[key], {replace: true});
		setselectedKeys([keyPath]);
	}

	return (
		<div className="AppDiv">
			<Layout className="layout">
				<Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
					<div className="logo">
						<Link className="MainPageLink" to="">LMS</Link>
					</div>
					<Menu
					theme="dark"
					mode="horizontal"
					style={{ "justifyContent": "flex-end" }}
					overflowedIndicator={false}
					selectedKeys={selectedKeys[0]}
					onClick={redirect}
					items={new Array(4).fill(null).map((_, index) => {
						const key = index;
						return {
						key,
						label: `${infoForNavbar[key]}`,
						};
					})}
					/>
				</Header>
			</Layout>
			<AppRouter className="BodyOfContent"/>
			<Layout>
				<Footer style={{ textAlign: 'center' }}>Learning Management System ©2023 Made by Vladimir Chernov</Footer>
			</Layout>
		</div>
	);
}

export default App;