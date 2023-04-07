// import libs:
import React from "react"
import { useLocation } from "react-router";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

// import styles:
import "../static/styles/ResultOfTest.css"

const ResultOfTest = () => {
    const location = useLocation().pathname.split('/');
    const prev_location = location.slice(0, location.length - 1).join('/');
    const {state} = useLocation();
    const { test_id, show_results, text } = state;

    const TITLE = `Результаты тестирования № ${test_id}`;

    return (
        <div className="ResultOfTestLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <h1>{ text }</h1>
            <Link className="PushAnotherAnswer" to={prev_location}>Отправить ещё один ответ</Link>
        </div>
    )
};

export default ResultOfTest;