// import libs:
import React, { useState } from "react"
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Form, Button } from 'semantic-ui-react';

// import styles:
import "../static/styles/Test.css"

const Task = () => {
    const location = useLocation().pathname.split('/');
    const test_id = Number(location.pop());
    const [tasks, setTasks] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const TITLE = `Тестирование № ${test_id}`;

    const onSubmitFunc = (data) => {
        let postData = {username: data['user'], answers: []};
        for (let i in data){
            if (i === "user"){
                continue;
            }
            postData.answers.push({id: i, user_answer: data[i]});
        }
        const response = axios.post("http://127.0.0.1:8000/api/get-answer/", postData);
    }

    React.useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/api/test5kl/${test_id}/`
        ).then((resp) => {
            const data = resp.data;
            setTasks(data['task']);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [test_id]);

    return (
        <div className="TaskLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <h1>Тестирование № {test_id}</h1>
            <Form className="Tasks" onSubmit={handleSubmit(onSubmitFunc)}>
                <Form.Field className="task">
                    <div className="content">
                        <div className="NamingOfQuestion">
                            <h3>{ `Фамилия Имя и Отчество проходящего работу.` }</h3>
                        </div>
                        <div className="description">
                            <p align="justify">
                                Введите ваши данные.
                            </p>
                        </div>
                        <div className="inputLayout">
                            <input
                                type="text"
                                required
                                className="input-answer"
                                {...register("user", {required: true})}
                                />
                            <span>
                                Ответ
                            </span>
                        </div>
                    </div>
                </Form.Field>
                {tasks.map((_, index) =>
                    <Form.Field className="task" key={index}>
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
                                    {...register(`${tasks[index]["id"]}`)}
                                />
                                <span>
                                    Ответ
                                </span>
                            </div>
                        </div>
                    </Form.Field>
                )}
                <Button className="Submit-Test" type='submit'>Отправить</Button>
            </Form>
            {/* {tasks.map((_, index) =>
                <h1>1</h1>
                // <h3 key={index}>{tasks[index]['id']} - {tasks[index]['description']}</h3>
            )} */}
        </div>
    )
};

export default Task;