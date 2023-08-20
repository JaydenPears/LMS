import React from 'react';
import { Link } from 'react-router-dom';

const Teachers = ({data}) => {
    const url_image = `https://admin.protonmos.ru/media/`;
    let items = [];
    if (data.length > 1){
        items.push(<h3>Педагоги:</h3>);
    }
    else {
        items.push(<h3>Педагог:</h3>);
    }
    for (let index in data) {
        items.push(
            <div className="teacher" key={0}>
                <div className="layout">
                    <div className="photo">
                        {data[index]["photo"] !== undefined
                            ? <img src={`${url_image}/${data[index]["photo"]}`} alt=""/>
                            : <img src="" alt=""/>
                        }
                    </div>
                    <div className="about-teacher">
                        <p className="">{ data[index]["name"] }</p>
                        <p className="phone">Номер телефона: { data[index]["phone"] }</p>
                        <Link
                            target={"_blank"}
                            rel="noopener noreferrer"
                            to={data[index]['url']}
                            className="detail-link"
                        >
                            Подробнее о педагоге
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="teachers">
            {items}
        </div>
    )
};

export default Teachers;