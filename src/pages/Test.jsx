// import libs:
import React, { useState } from "react"
import { useLocation } from "react-router";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import axios from 'axios'

// import styles:
import "../static/styles/Test.css"

const Task = () => {
    const location = useLocation().pathname.split('/');
    const test_id = Number(location.pop());
    const [tasks, setTasks] = useState([]);
    const [answers, setAsnwers] = useState({});

    const TITLE = `Тестирование № ${test_id}`;

    const changeAnswersOfTest = (index, value) => {
        console.log(answers);
        setAsnwers(prevAnswers => ({...prevAnswers, [index]: value}));
    }

    React.useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/api/test5kl/${test_id}/`
        ).then((resp) => {
            const data = resp.data;
            setTasks(data['task']);
            for (let i = 0; i < tasks.length; i++){
                setAsnwers(prevAnswers => ({...prevAnswers, [i]: ""}))
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [test_id]);

    return (
        <div className="TaskLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <h1>Тестирование № {test_id}</h1>
            <div className="Tasks">
            {tasks.map((_, index) =>
                    <div className="card" key={index}>
                        <div className="content">
                            <div className="NamingOfQuestion">
                                <h3>{ `Задание № ${index + 1}. Прототип № ${tasks[index]["id"]} из банка заданий.` }</h3>
                            </div>
                            <div className="description">
                                <p align="justify">
                                    { tasks[index]['description'] }
                                </p>
                            </div>
                            <div className="inputLayout">
                                <input
                                    a-key={index}
                                    type="text"
                                    className="input-answer"
                                    required="required"
                                    onChange={
                                        (e) => changeAnswersOfTest(e.target.getAttribute('a-key'), e.target.value)
                                    }
                                    />
                                <span>
                                    Ответ
                                </span>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
            {/* {tasks.map((_, index) =>
                <h1>1</h1>
                // <h3 key={index}>{tasks[index]['id']} - {tasks[index]['description']}</h3>
            )} */}
        </div>
    )
};

export default Task;