import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ItemFrame = styled.div`
    border: solid 1px gray;
    padding: 10px;
    margin: 15px 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px grey;
    font-family: Arial;
`;

const Input = styled.input`
    border: solid 1px black;
    padding: 5px;
    border-radius: 3px;
`;

const Title = styled(Input) `
    text-transform: uppercase;
`;

const Save = styled.button`
   width: 100px;
   margin: 10px;
   background: green;
   color: white;
   font-size: 16px;
   padding: 10px;
   border-radius: 5px;
`;

const Item = ({ item }) => {
    const [data, setData] = useState(item);
    const [dirty, setDirty] = useState(false);

    function update(value, fieldName, obj) {
        setData({ ...obj, [fieldName]: value });
        setDirty(true);
    }

    function onSave() {
        setDirty(false);
        // make REST call
    }

    return (<React.Fragment>
        <ItemFrame>
            <h3>
                <Title onChange={(evt) => update(evt.target.value, 'name', data)} value={data.name} />
            </h3>
            <div>
                <Input onChange={(evt) => update(evt.target.value, 'description', data)} value={data.description} />
            </div>
            {dirty ?
                <div><Save onClick={onSave}>Save</Save></div> : null
            }
        </ItemFrame>
    </React.Fragment>)
}

const Main = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch("http://localhost:5000/items")
            .then(response => response.json())
            .then(data => setItems(data))
    }

    const data = items.map(item => <Item item={item} />)

    return (<React.Fragment>
        {items.length === 0 ?
            <div>No item</div> :
            <div>{data}</div>
        }
    </React.Fragment>)
}
export default Main;