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
            {tasks.map((_, index) =>
                <h3 key={index}>{tasks[index]['id']} - {tasks[index]['description']}</h3>
            )}
        </div>
    )
};

export default Task;