import React, { useState } from "react"
import { MultiSelect } from "react-multi-select-component";


const MyMultiSelect = ({parentCallback, options}) => {
    const [selected, setSelected] = useState([]);

    React.useEffect(() => {
        let returnItems = [];
        for (var key in selected){
            returnItems.push(selected[key]["value"])
        }
        parentCallback(returnItems);
    }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const customValueRenderer = (selected, _options) => {
        if (selected.length === 0) {
            return "Любой"
        }
        else {
            console.log(selected)
            var new_array = []
            for (var i in selected){
                new_array.push(selected[i]['label'])
            }
            return new_array.join(", ")
        }
        // else if (selected.length % 10 === 1 && selected.length !== 11){
        //     return `Выбран ${selected.length} вариант`
        // }
        // else if (selected.length % 10 >= 2 && selected.length % 10 <= 4){
        //     return `Выбрано ${selected.length} варианта`
        // }
        // else {
        //     return `Выбрано ${selected.length} вариантов`
        // }
    };

    return (
        <div className="MultiSelect" style={{width: "100%", height: "50px"}}>
            <MultiSelect
                overrideStrings={{
                    "allItemsAreSelected": "All items are selected.",
                    "clearSearch": "Clear Search",
                    "noOptions": "No options",
                    "search": "Search",
                    "selectAll": "Выбрать все",
                    "selectSomeItems": "Select..."
                }}
                hasSelectAll={true}
                disableSearch
                options={options}
                value={selected}
                valueRenderer={customValueRenderer}
                onChange={setSelected}
                labelledBy="Select"
                styles={{}}
            />
        </div>
    )
};

export default MyMultiSelect;