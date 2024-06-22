import { useState, useEffect } from 'react';
import Layout from '@/components/layout';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location (using Geolocation API)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        setError('Unable to retrieve location');
        setLoading(false);
      }
    );
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = process.env.WEATHER_API;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="weather-info">
          <h3 style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>Weather Information</h3>
          <div className="info-tile">
            <p style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>Location: {weatherData.location.name}, {weatherData.location.country}</p>
            <p style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>Temperature: {weatherData.current.temp_c}°C</p>
            <p style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>Description: {weatherData.current.condition.text}</p>
          </div>
        </div>
        <div className="weather-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/825/195/non_2x/3d-weather-icon-day-with-rain-free-png.png"
            alt="Weather Icon"
            className="icon"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          min-width: 100%;
          background-image: url('https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .weather-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 2rem;
        }

        .info-tile {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          max-width: 600px; /* Adjust the maximum width */
          width: 100%; /* Adjust the width */
          max-height: 400px; /* Adjust the maximum height */
          height: auto; /* Allow the height to adjust based on content */
        }
        
        .weather-image {
          display: flex;
          justify-content: center;
        }
        
        .icon {
          width: 300px;
          height: auto;
        }
      `}</style>
    </Layout>
  );
}
