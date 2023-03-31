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
            <div className="Tasks">
                <div className="card" key={1}>
                    <div className="content">
                        <div className="NamingOfQuestion">
                            <h3>{ 'Задание № 1. Прототип из базы № 15.' }</h3>
                        </div>
                        <div className="description">
                            <p align="justify">
                            Логическая функция F задаётся выражением (w ∨ ¬x) ∧ (w ≡ ¬y) ∧ (w → z). На рисунке приведён частично заполненный фрагмент таблицы истинности функции F, содержащий неповторяющиеся строки. Определите, какому столбцу таблицы истинности функции F соответствует каждая из переменных x, y, z, w.
                            В ответе напишите буквы x, y, z, w в том порядке, в котором идут соответствующие им столбцы (сначала  — буква, соответствующая первому столбцу; затем  — буква, соответствующая второму столбцу, и т. д.). Буквы в ответе пишите подряд, никаких разделителей между буквами ставить не нужно.
Пример. Пусть задано выражение x → y, зависящее от двух переменных x и y, и фрагмент таблицы истинности:
Тогда первому столбцу соответствует переменная y, а второму столбцу соответствует переменная x. В ответе нужно написать: yx.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* {tasks.map((_, index) =>
                <h1>1</h1>
                // <h3 key={index}>{tasks[index]['id']} - {tasks[index]['description']}</h3>
            )} */}
        </div>
    )
};

export default Task;