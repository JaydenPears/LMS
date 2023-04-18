import React, { useEffect, useState } from "react"
import axios from "axios";
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// static imports
import "../static/styles/CourseDescription.css"
import proton_round from "../static/imgs/proton-round.png"

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

const CourseDescription = () => {
    const url = `http://90.156.209.157:8000/api/`;
    const url_image = `http://90.156.209.157:8000/media/`;
    const [teacher, setTeacher] = useState({});
    const [translateTypeOfActivity, settranslateTypeOfActivity] = useState({});
    const [linkForActivityImg, setlinkForActivityImg] = useState({});
    const [infoAboutCourse, setInfoAboutCourse] = useState({});
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
            axios.get(
                `${url}teacher/${data["teacher_id"]}/`
            ).then((response) => {
                const data_teacher = response.data;
                setTeacher({"photo": data_teacher["photo"], "name": data_teacher["fio"]});
            });
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
                <div className="activity">
                    <div className="logo">
                        <img src={linkForActivityImg[type_of_activity] !== undefined
                            ? `${url_image}${linkForActivityImg[type_of_activity]}` 
                            : ``}
                        alt=""/>
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
                <div className="teacher">
                    <h3>Преподаватель:</h3>
                    <div className="layout">
                        <div className="photo">
                            <img src={teacher["photo"] !== undefined
                                ? `${teacher["photo"]}` 
                                : ``}
                            alt=""/>
                        </div>
                        <p className="">{ teacher["name"] }</p>
                    </div>
                </div>
                <Link to={`${infoAboutCourse['url']}`} className="enter">Записаться</Link>
            </div>
        </div>
    );
};

export default CourseDescription;