import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import AppRouter from "./components/AppRouter";
import "./static/styles/base.css"
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';

const { Header, Footer } = Layout;
const infoForNavbar = [
	"Каталог курсов",
];

const pathForNavbar = [
	"",
];


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
			<Layout className="layout" style={{minHeight: "100%"}}>
				<Header style={{position: "sticky", top: 0, zIndex: 999, width: '100%' }}>
					<div className="logo" style={{whiteSpace: "nowrap", width: "auto", fontSize: "42px"}}>
						<Link className="MainPageLink" to="">Каталог курсов</Link>
					</div>
					<Menu
					theme="dark"
					mode="horizontal"
					style={{ "justifyContent": "flex-end" }}
					overflowedIndicator={true}
					selectedKeys={selectedKeys[0]}
					onClick={redirect}
					items={new Array(infoForNavbar.length).fill(null).map((_, index) => {
						const key = index;
						return {
						key,
						label: `${infoForNavbar[key]}`,
						};
					})}
					/>
				</Header>
				<AppRouter className="BodyOfContent"/>
				<Layout>
					<Footer style={{ textAlign: 'center', background: "#e7e7e7"}}>Learning Management System ©2023 Made by Vladimir Chernov</Footer>
				</Layout>
			</Layout>
		</div>
	);
}

export default App;