// Import libs
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import MyMultiSelect from "../components/MyMultiSelect";
import { settings } from "../settings_for_filters";
import {
    infoAboutCoursesTest, linkForActivityImg, translateTypeOfActivity
} from "../info_about_course/index.js"

// Import static
import "../static/styles/CatalogOfCourses.css"

const TITLE = "Каталог курсов ГБОУ \"Образовательный центр \"Протон\"";

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

const CatalogOfCourses = () => {
    const [courses, setCourses] = useState([...infoAboutCoursesTest])
    const [searchTerm, setSearchTerm] = useState("");

    const textForFilters = [
        "Направленность",
        "Адрес учреждения",
        "Класс",
        "Расписание посещения",
        "Стоимость"
    ]

    const convertNum = (strNum) => {
        if (strNum === 3){
            return `${strNum}-и`
        }
        else{
            return `${strNum}-ые`
        }
    }

    const [activityFilter, setActivityFilter] = useState([])
    const [adressFilter, setAdressFilter] = useState([])
    const [ageLimitFilter, setAgeLimitFilter] = useState([])
    const [scheduleFilter, setScheduleFilter] = useState([])
    const [costFilter, setCostFilter] = useState([])

    const setFilters = [setActivityFilter, setAdressFilter, setAgeLimitFilter, setScheduleFilter, setCostFilter];

    const filterCourses = (coursesList) => {
        let newCoursesList = [];
        for (let index in coursesList){
            let count = 0
            let item = coursesList[index];
            let type_of_course = translateTypeOfActivity[item["type_of_activity"]];

            if (activityFilter.length !== 0){
                if (activityFilter.includes(type_of_course)){
                    count++;
                }
            }
            else {
                count++;
            }

            if (adressFilter.length !== 0){
                if (adressFilter.includes(item["address"])){
                    count++;
                }
            }
            else {
                count++;
            }

            let ages = []
            for (let i in ageLimitFilter){
                let age = Number(ageLimitFilter[i].split(" ")[0])
                ages.push(age);
            }
            if (item["age_limit"].length === 1 && ages.length !== 0){
                if (ages.includes(Number(item["age_limit"][0]))){
                    count++;
                }
            }
            else if (item["age_limit"].length === 2 && ages.length !== 0) {
                for (let i in ages){
                    let num = ages[i];
                    if (num >= Number(item["age_limit"][0]) && num <= Number(item["age_limit"][1])){
                        count++;
                        break;
                    }
                }
            }
            else {
                count++;
            }

            if (scheduleFilter.length !== 0){
                for (let i in item["schedule"]){
                    let day = item["schedule"][i];
                    if (scheduleFilter.includes(day) || day === "Любой день недели"){
                        count++;
                        break;
                    }
                }
            }
            else{
                count++;
            }

            let courseCost = capitalizeFirstLetter(item["cost"].split(" ")[1])
            if (costFilter.length !== 0){
                if (costFilter.includes(courseCost)){
                    count++;
                }
            }
            else{
                count++;
            }

            if (count === 5){
                newCoursesList.push(item);
            }
        }
        return newCoursesList;
    }

    const filterSearchCourses = (searchText, listOfCourses) => {
        if (!searchText){
            return listOfCourses;
        }
        return listOfCourses.filter(({name}) => {
            return name.toLowerCase().includes(searchText.toLowerCase())});
    }

    const filteredAndSearchedCourses = () => {
        let searchedCourses = filterSearchCourses(searchTerm, infoAboutCoursesTest);
        let searchedAndFilteredCourses = filterCourses(searchedCourses);
        return searchedAndFilteredCourses;
    }

    React.useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredCourses = filteredAndSearchedCourses();
            setCourses([...filteredCourses]);
        }, 300);
        return () => clearTimeout(Debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, activityFilter, adressFilter, ageLimitFilter, scheduleFilter, costFilter]);

    const getSelectors = () => {
        let items = [];
        let keys = Object.keys(settings);
        for (let index = 0; index < keys.length; index++){
            let key = keys[index];
            items.push(
                <div className="FilterCard" key={index}>
                    <h4>{textForFilters[index]}</h4>
                    <MyMultiSelect
                        parentCallback={setFilters[index]}
                        options={settings[key]}
                        key={index}
                    />
                </div>
            )
        }
        return items;
    }
    
    const selectors = getSelectors();

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
                <div className="Filters">
                    {selectors.map((_, index) =>
                        selectors[index]
                    )}
                </div>
            </div>
            <div className="CardsContainer">
                {courses.map((_, index) =>
                    <div className="card" key={index}>
                        <div className="content">
                            <div className="NamingOfCourse">
                                <img
                                    className=""
                                    src={ linkForActivityImg[courses[index]['type_of_activity']]}
                                    alt=""
                                />
                                <h3>{ courses[index]['name'] }</h3>
                            </div>
                            <div className="description">
                                <p align="justify">
                                Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit. sed quia consequuntur magni dolores eos, qui ratione voluptatem.
                                </p>
                            </div>
                            <div className="about-course">
                                <p>👨‍🏫 { courses[index]['teacher'] }</p>
                                <p>🏢 { courses[index]['address'] }</p>
                                <p>🧒
                                {courses[index]['age_limit'].length === 1
                                    ? ` ${convertNum(courses[index]['age_limit'][0])} класс`
                                    : ` С ${courses[index]['age_limit'][0]}-${courses[index]['age_limit'][1]} классы`
                                }
                                </p>
                                <p>📅 { courses[index]['schedule'].join(", ") }</p>
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