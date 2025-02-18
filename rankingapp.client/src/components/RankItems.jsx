import { useEffect, useState } from 'react';
import MovieImageArr from './MovieImages';
import '../custom.css'


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

    console.log(MovieImageArr, "logging MovieImaages Arer");

    return (
        <main>
            <div className="items-not-ranked">

                {
                    //(items !== null) ? items.map((item) => <h3 key={item.id}>{item.title}</h3>) : <div>Loading..</div>
                
                    
                    items.length > 0 ? (
                        items.map((item) => (
                            <div className="unranked-cell" key={`item-${item.id}`}>
                                <img
                                    id={`item-${item.id}`}
                                    src={MovieImageArr.find((o) => o.id === item.imageId)?.image}
                                    alt={item.name}
                                />
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )
                    

                }
            </div>

        </main>

    )

}
export default RankItems;