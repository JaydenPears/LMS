import React from "react"
import "../static/styles/CourseDescription.css"
import proton_round from "../static/imgs/proton-round.png"

const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
]

const CourseDescription = () => {
    return (
        <div className="CourseDescriptionLayout">
            <div className="naming">
                <div className="logo">
                    <img src={proton_round} alt=""/>
                </div>
                <div className="brief-information">
                    <div className="name">
                        <h1>
                            Лицей Академии Яндекса
                        </h1>
                        <hr/>
                    </div>
                    <div className="short-description">
                        <p align="justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
            <div className="activity">
                <div className="logo">
                    <img src="" alt=""/>
                </div>
                <div className="name-of-activity">
                    <h1>
                        Техническая направленность
                    </h1>
                </div>
            </div>
            <div className="description">
                <h3>Подробнее о курсе:</h3>
                <p align="justify">
                    Вот пример статьи на 1000 символов. Это достаточно маленький текст, оптимально подходящий для карточек товаров в интернет-магазинах или для небольших информационных публикаций. В таком тексте редко бывает более 2-3 абзацев и обычно один подзаголовок. Но можно и без него. На 1000 символов рекомендовано использовать 1-2 ключа и одну картину.
                    Текст на 1000 символов – это сколько примерно слов? Статистика Word показывает, что «тысяча» включает в себя 150-200 слов средней величины. Но, если злоупотреблять предлогами, союзами и другими частями речи на 1-2 символа, то количество слов неизменно возрастает.
                    В копирайтерской деятельности принято считать «тысячи» с пробелами или без. Учет пробелов увеличивает объем текста примерно на 100-200 символов – именно столько раз мы разделяем слова свободным пространством. Считать пробелы заказчики не любят, так как это «пустое место». Однако некоторые фирмы и биржи видят справедливым ставить стоимость за 1000 символов с пробелами, считая последние важным элементом качественного восприятия. Согласитесь, читать слитный текст без единого пропуска, никто не будет. Но большинству нужна цена за 1000 знаков без пробелов.
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
                            <div className="card">
                                <p align="center">
                                    17:30<br/>-<br/>18:30
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="intelligence">
                <h3>Адрес проведения: </h3><h3 className="with-text-decoration">Большая Филёвская, дом 15</h3>
            </div>
            <div className="type-of-study">
                <h3>Формат проведения: </h3><h3 className="with-text-decoration">Очные занятия</h3>
            </div>
            <div className="teacher">
        
            </div>
        </div>
    );
};

export default CourseDescription;