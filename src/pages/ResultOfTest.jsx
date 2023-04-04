// import libs:
import React from "react"
import { useLocation } from "react-router";
import { Helmet } from 'react-helmet';

// import styles:
import "../static/styles/ResultOfTest.css"

const ResultOfTest = () => {
    const {state} = useLocation();
    const { test_id, show_results, text } = state;

    const TITLE = `Результаты тестирования № ${test_id}`;

    return (
        <div className="ResultOfTestLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <h1>{ text }</h1>
        </div>
    )
};

export default ResultOfTest;