import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "../static/styles/CatalogOfCourses.css"
import {infoAboutCoursesTest, linkForActivityImg} from "../info_about_course/index.js"

const TITLE = "Каталог курсов ГБОУ \"Образовательный центр \"Протон\"";

const filterCourses = (searchText, listOfCourses) => {
    if (!searchText){
        return listOfCourses;
    }
    return listOfCourses.filter(({name}) => {
        return name.toLowerCase().includes(searchText.toLowerCase())});
}

const CatalogOfCourses = () => {
    const [courses, setCourses] = useState([...infoAboutCoursesTest])
    const [searchTerm, setSearchTerm] = useState("");

    React.useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredCourses = filterCourses(searchTerm, infoAboutCoursesTest);
            setCourses([...filteredCourses]);
        }, 300);
        return () => clearTimeout(Debounce);
    }, [searchTerm]);

    return (
        <div className="CatalogLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="SearchAndFilter">
                <input
                    className="SearchInput"
                    placeholder="Хотите найти конкретный курс?"
                    type={"text"}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="CardsContainer">
                {courses.map((_, index) =>
                    <div className="card" key={index}>
                        <div className="content">
                            <img
                                className=""
                                src={ linkForActivityImg[courses[index]['type_of_activity']]}
                                alt=""
                            />
                            <h3>{ courses[index]['name'] }</h3>
                            <div className="description">
                                <p align="justify">
                                Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit. sed quia consequuntur magni dolores eos, qui ratione voluptatem.
                                </p>
                            </div>
                            <div className="about-course">
                                <p>👨‍🏫 { courses[index]['teacher'] }<br/>🏢 { courses[index]['address'] }</p>
                                <p>🧒 { courses[index]['age_limit'] }<br/>📅 { courses[index]['schedule'] }</p>
                                <p>💵 { courses[index]['cost'] }</p>
                                <Link to={`/course_info/${courses[index]['id_course']}`} className="detailed-info">Подробнее</Link>
                                <Link to="" className="enter">Записаться</Link>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
};

export default CatalogOfCourses;