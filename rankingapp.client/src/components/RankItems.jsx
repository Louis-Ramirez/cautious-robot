import { useEffect, useState } from 'react';


const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1; 

    useEffect(() => {
        fetch(`item/${dataType}`).then((results) => {
            return results.json();
        }).then(data => {
            setItems(data);
        });

    }, []);



    return (
        <main>
            {
                (items !== null) ? items.map((item) => <h3 key={item.id}>{item.title}</h3>) : <div>Loading..</div>
            }
        </main>

    )

    //  19:47
}
export default RankItems;