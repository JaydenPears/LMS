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
        return selected.length
          ? `Выбрано ${selected.length} items`
          : "Любой";
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