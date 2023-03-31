// import libs:
import React, { useState } from "react"
import { useLocation } from "react-router";
import { Helmet } from 'react-helmet';
import axios from 'axios'

// import styles:
import "../static/styles/Task.css"

const Task = () => {
    const location = useLocation().pathname.split('/');
    const task_id = Number(location.pop());
    const [tasks, setTasks] = useState([]);

    const TITLE = `Тестирование № ${task_id}`;

    const func = (e) => {
        console.log(e.target.getAttribute('a-key'));
    }

    React.useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/api/test5kl/${task_id}/`
        ).then((resp) => {
            const data = resp.data;
            setTasks(data['task']);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task_id]);

    return (
        <div className="TaskLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <h1>Task № {task_id}</h1>
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
                                    onChange={(e) => func(e)}
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