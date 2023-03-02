import React from "react"
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "../static/styles/CatalogOfCourses.css"
import {infoAboutCoursesTest, linkForActivityImg} from "../info_about_course/index.js"

const TITLE = "Каталог курсов ГБОУ \"Образовательный центр \"Протон\"";

const CatalogOfCourses = () => {
    return (
        <div className="CatalogLayout">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="SearchAndFilter">
                <input/>
            </div>
            <div className="CardsContainer">
                {infoAboutCoursesTest.map((_, index) =>
                    <div class="card">
                        <div class="content">
                            <img
                                className=""
                                src={linkForActivityImg[infoAboutCoursesTest[index]['type_of_activity']]}
                                alt=""
                            />
                            <h3>{ infoAboutCoursesTest[index]['name'] }</h3>
                            <div class="description">
                                <p align="justify">
                                Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit. sed quia consequuntur magni dolores eos, qui ratione voluptatem.
                                </p>
                            </div>
                            <div class="about-course">
                                <p>👨‍🏫 { infoAboutCoursesTest[index]['teacher'] }<br/>🏢 { infoAboutCoursesTest[index]['address'] }</p>
                                <p>🧒 { infoAboutCoursesTest[index]['age_limit'] }<br/>📅 { infoAboutCoursesTest[index]['schedule'] }</p>
                                <p>💵 { infoAboutCoursesTest[index]['cost'] }</p>
                                <Link to={`/course_info/${infoAboutCoursesTest[index]['id_course']}`} class="detailed-info">Подробнее</Link>
                                <Link to="" class="enter">Записаться</Link>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
};

export default CatalogOfCourses;