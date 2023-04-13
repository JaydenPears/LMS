import axios from "axios";

async function getData(url) {
    let translate = {"type_of_activity": "activities/", "address": "addresses/"};
    const priority = ["type_of_activity", "address", "age_limit", "schedule", "cost"];
    const data = {
        "age_limit": [
            {label: "1 класс", value: "1 класс"},
            {label: "2 класс", value: "2 класс"},
            {label: "3 класс", value: "3 класс"},
            {label: "4 класс", value: "4 класс"},
            {label: "5 класс", value: "5 класс"},
            {label: "6 класс", value: "6 класс"},
            {label: "7 класс", value: "7 класс"},
            {label: "8 класс", value: "8 класс"},
            {label: "9 класс", value: "9 класс"},
            {label: "10 класс", value: "10 класс"},
            {label: "11 класс", value: "11 класс"},
        ],
        "schedule": [
            {label: "Понедельник", value: "Понедельник"},
            {label: "Вторник", value: "Вторник"},
            {label: "Среда", value: "Среда"},
            {label: "Четверг", value: "Четверг"},
            {label: "Пятница", value: "Пятница"},
            {label: "Суббота", value: "Суббота"},
            {label: "Воскресенье", value: "Воскресенье"},
        ],
        "cost": [
            {label: "Бесплатно", value: "Бесплатно"},
            {label: "Платно", value: "Платно"},
        ],
    };
    let settings = {};
    for (let i in priority){
        let key = priority[i];
        if (key in data){
            settings[key] = data[key];
        }
        else {
            await axios.get(
                `${url}${translate[key]}`
            ).then((response) => {
                const data = response.data;
                let array = [];
                for (let i in data){
                    array.push(data[i]);
                }
                settings[key] = array;
            })
        }
    };
    return settings;
}

export const getSettings = async (url) => {
    let result = await getData(url);
    return result;
}