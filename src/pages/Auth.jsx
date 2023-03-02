import React from "react"
import { Button, Input, Typography } from 'antd';
import "../static/styles/Auth.css";
import { Helmet } from 'react-helmet';

const { Text } = Typography;
const TITLE = 'Авторизация пользователя организации';

const Auth = () => {
    return (
        <div className="AuthLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="AuthLayoutWrapper">
                <div className="AuthLayout_innerWrapper">
                    <div className="ContextWrapper">
                        <Typography.Title
                            level={2}
                            style={{
                            margin: 0,
                            textAlign: "center",
                            }}
                        >
                            Давайте начнём
                        </Typography.Title>
                        <Text className="Text">
                            Организация — отдельная подсистема со всем необходимым функционалом
                        </Text>
                    </div>
                    <Input className="Join" size="large" placeholder="AAA-BBB-CCC-DDD" maxLength={15}/>
                    <Button className="JoinSubmit" type="primary">ПРИСОЕДИНИТЬСЯ</Button>
                </div>
            </div>
        </div>
    )
};

export default Auth;