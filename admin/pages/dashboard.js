import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import Layout from '@/components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const chartRef = useRef(null);
  const { data: session } = useSession();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orderData.length > 0) {
      const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil(days / 7);
      };
      const groupOrdersByWeek = orderData.reduce((acc, order) => {
        const weekNumber = getWeekNumber(new Date(order.createdAt));
        if (!acc[weekNumber]) {
          acc[weekNumber] = [];
        }
        acc[weekNumber].push(order);
        return acc;
      }, {});
      const chartData = {
        labels: Object.keys(groupOrdersByWeek).map((week) => `Week ${week}`),
        datasets: [
          {
            label: 'Orders by Week',
            data: Object.values(groupOrdersByWeek).map((orders) => orders.length),
            borderColor: 'green',
            borderWidth: 4,
            tension: 0.4,
          },
        ],
      };
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      return () => {
        chartInstance.destroy();
      };
    }
  }, [orderData]);

  return (
    <Layout>
       <div className="flex text-green-900 flex justify-between">
        <h2>
          Welcome, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-grey-900 gap-1 text-black rounded-lg">
         <img src={session?.user?.image} alt="" className="w-6 h-6" />
         {session?.user?.name}
        </div>
      </div>
      <div>
        <div className="container">
          <div className="chart-container">
            <canvas ref={chartRef} />
          </div>
        </div>
      </div>
      <style jsx>{`
        html,
        body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        #__next {
          height: 100%;
          width: 100%;
          display: flex;
        }

        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .chart-container {
          flex: 1;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .chart-container > canvas {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </Layout>
  );
}