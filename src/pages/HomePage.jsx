import React from "react"
import "../static/styles/HomePage.css"
import { Typography } from 'antd';
import "../static/styles/Auth.css";
import { Helmet } from 'react-helmet';

const TITLE = 'Главная страница';

const HomePage = () => {
    return (
        <div className="HomeLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <Typography.Title
                level={2}
                style={{
                margin: 0,
                textAlign: "center",
                width: "600px",
                marginTop: "10px",
            }}>
                Что же из себя представляет обучающая система?
            </Typography.Title>
        </div>
    )
};

export default HomePage;