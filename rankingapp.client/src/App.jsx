import { useEffect, useState } from 'react';
import './App.css';
import { Layout } from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherForecast from './components/WeatherForecast';
import MovieImageArr from "./components/MovieImages.js";
import RankItemsContainer from "./components/RankItemsContainers";
import AlbumImageArr from "./components/AlbumImages.js"


function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);


    return (
       <Router>
            <Layout>

                <Routes>
                    <Route path="/" element={<WeatherForecast forecasts={forecasts} />} />
                    <Route path="/rank-items" element={<RankItemsContainer dataType={1} imgArr={MovieImageArr} />} />
                    <Route path="/rank-albums" element={<RankItemsContainer dataType={2} imgArr={AlbumImageArr} />} />
                

                </Routes>

            </Layout>
       
       
       </Router>


        
 

    );
    

    async function populateWeatherData() {
        try {
            const response = await fetch('weatherforecast');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
        
            setForecasts(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
}

export default App;