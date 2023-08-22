import React, { useEffect, useState } from "react"
import axios from "axios";
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Teachers from '../components/Teachers';

// static imports
import "../static/styles/CourseDescription.css";
import proton_round from "../static/imgs/proton-round.png";

axios.defaults.baseURL = '';

const days = [
    "ПН",
    "ВТ",
    "СР",
    "ЧТ",
    "ПТ",
    "СБ",
    "ВС"
]

const getCost = (data) => {
    if (data[0] === 'Платно'){
        return `${data[1]} рублей за занятие`
    }
    return data[0]
}

const CourseDescription = () => {
    // for test-server:
    // const url = `http://127.0.0.1:8000/api/`;
    // const url_image = `http://127.0.0.1:8000/media/`;
    // for production:
    const url = `https://admin.protonmos.ru/api/`;
    const url_image = `https://admin.protonmos.ru/media/`;
    const [translateTypeOfActivity, settranslateTypeOfActivity] = useState({});
    const [linkForActivityImg, setlinkForActivityImg] = useState({});
    const [infoAboutCourse, setInfoAboutCourse] = useState({
        "id_course": 0,
        "type_of_activity": 1,
        "name": "",
        "teachers": [
            {
                "name": "",
                "url": "",
                "photo": "",
                "phone": "",
            }
        ],
    });
    const location = useLocation();

    let data = location.pathname.split('/');
    const id_course = Number(data.pop());

    useEffect(() => {
       window.scrollTo(0, 0);

       axios.get(
        `${url}catalog/${id_course}/`
        ).then((response) => {
            const data = response.data;
            setInfoAboutCourse({...data});
        });

        axios.get(
            `${url}departments-icons-dict/`
        ).then((response) => {
            const data = response.data;
            setlinkForActivityImg({...data});
        });

        axios.get(
            `${url}departments-name-dict/`
        ).then((response) => {
            const data = response.data;
            settranslateTypeOfActivity({...data});
        });
    }, [id_course, url]);

    const type_of_activity = infoAboutCourse["type_of_activity"];
    const TITLE = `${infoAboutCourse["name"]}`;

    return (
        <div className="CourseDescriptionLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="naming">
                <div className="logo">
                    <img src={proton_round} alt=""/>
                </div>
                <div className="brief-information">
                    <div className="name">
                        <h1>
                            {infoAboutCourse["name"]}
                        </h1>
                        <hr/>
                    </div>
                    <div className="short-description">
                        <p align="justify">
                            { infoAboutCourse['short_description'] }    
                        </p>
                    </div>
                </div>
            </div>
            <div className="contentLayout">
                <div className="layoutForInfo">
                    <div className="activity">
                        <div className="logo">
                            <img
                                src=
                                {linkForActivityImg[type_of_activity] !== undefined
                                    ? `${url_image}${linkForActivityImg[type_of_activity]}`
                                    : ``
                                }
                                alt=""
                            />
                        </div>
                        <div className="name-of-activity">
                            <h1>
                                { translateTypeOfActivity[type_of_activity] }
                            </h1>
                        </div>
                    </div>
                    <div className="description">
                        <h3>Подробнее о курсе:</h3>
                        <p align="justify">
                            { infoAboutCourse["full_description"] }    
                        </p>
                    </div>
                    <div className="schedule">
                        <h2>Расписание</h2>
                        <div className="cards">
                            {days.map((_, index) =>
                                <div className="day-card" key={`${index}`}>
                                    <h3>
                                        {days[index]}
                                    </h3>
                                    {infoAboutCourse['schedule'] !== undefined
                                        ?
                                        <>
                                            {days[index] in infoAboutCourse["schedule"]
                                            ?
                                                <div className="card">
                                                    <p align="center">
                                                        { infoAboutCourse["schedule"][days[index]][0] }
                                                        <br/>-<br/>
                                                        { infoAboutCourse["schedule"][days[index]][1] }
                                                    </p>
                                                </div>
                                            :
                                                <div className="card" style={{background:"#b8b8b8"}}>
                                                    <p align="center">
                                                        -
                                                    </p>
                                                </div>
                                            }
                                        </>
                                        :
                                        <div className="card">
                                            <p align="center">
                                                00:00
                                                <br/>-<br/>
                                                00:00
                                            </p>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="intelligence">
                        <h3>Адрес проведения: </h3><p className="with-text-decoration">{ infoAboutCourse["address"] }</p>
                    </div>
                    <div className="type-of-study">
                        <h3>Формат проведения: </h3><p className="with-text-decoration">{ infoAboutCourse["format"] }</p>
                    </div>
                    <div className="cost">
                        <h3>Стоимость занятий: </h3>
                        {infoAboutCourse['cost'] === undefined
                            ? <p className="with-text-decoration"></p>
                            : <p className="with-text-decoration">{getCost(infoAboutCourse['cost'])}</p>
                        }
                    </div>
                    <Teachers data={infoAboutCourse["teachers"]}/>
                    {!infoAboutCourse['is_open']
                        ? <Link to="" disabled className="closed">Запись закрыта</Link>
                        :
                        <Link
                            to={`${infoAboutCourse['url']}`}
                            className="enter"
                            target={"_blank"}
                            rel="noopener noreferrer"
                        >
                            Записаться
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;