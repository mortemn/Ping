"use client";
import styles from "./page.module.css";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);

const ProfilePage = () => {
  const [value, setValue] = useState(75);
  let doughnutData = [
    {
      label: "Label 1",
      value: value,
      color: "#c22c2c",
      cutout: "65%",
    },
    {
      label: "Label 2",
      value: 100 - value,
      color: "#00000000",
      cutout: "75%",
    },
  ];

  const doughnutfinalData = {
    labels: doughnutData.map((item) => item.label),
    backgroundColor: "#fe5558",
    datasets: [
      {
        data: doughnutData.map((item) => Math.round(item.value)),
        backgroundColor: doughnutData.map((item) => item.color),
        borderColor: doughnutData.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(doughnutData.length).fill(false),
        // backgroundColor:"#fe5558"
      },
    ],
  };

  const doughnutOptions = {
    
    cutout: doughnutData.map((item) => item.cutout),
    elements: {
      arc: {
        borderRadius: 200,
      },
    },
  };


  let doughnutData2 = [
    {
      label: "Label 1",
      value: 100,
      color: "#fe5558",
      cutout: "65%",
    }
  ];
  const doughnutfinalData2 = {
    labels: doughnutData2.map((item) => item.label),
    backgroundColor: "#fe5558",
    datasets: [
      {
        data: doughnutData2.map((item) => Math.round(item.value)),
        backgroundColor: doughnutData2.map((item) => item.color),
        borderColor: doughnutData2.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(doughnutData2.length).fill(false),
      },
    ],
  };

  const doughnutOptions2 = {
    cutout: doughnutData.map((item) => item.cutout),
    animation: false,
    elements: {
      arc: {
        borderRadius: 0,
      },
    },
  };
 
  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Line Chart",
        data: [18, 22, 66, 64, 90],
        fill: false,
        borderColor: "#fe5558",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20, // Set the step size to 20
        },
        border: {
          color: "#00000000", // Blue border color
        },
      },

      x: {
        display: false, // Remove y axis
      },
    },
  };

  return (
    <body>
      <header className={styles["header"]}>
        <h2 className={styles["logo"]}>
          P<span className={styles["red-letter"]}>I</span>NG
        </h2>
        <nav className={styles["navigation"]}>
          <button className={styles["btn"]}>LOG OUT</button>
          <button className={styles["btn"]}>PLAY</button>
        </nav>
      </header>
      <div className={styles.container}>
        <div className={styles["left-panel"]}>
          <div className={styles["left-top-panel"]}>
            <div className={styles["user-avatar"]}></div>
            <p>Player</p>
            <div className={styles["player-comment"]}></div>
          </div>
          <div className={styles["left-bottom-panel"]}>
            <p>Achievements</p>
          </div>
        </div>
        <div className={styles["right-panel"]}>
          <p className={styles["game-stats"]}>Game Stats</p>
          <div className={styles["stats-panel"]}>
            <div className={styles["stats-left"]}>
              <p>Win Rate</p>
              {/* <Doughnut data={finalData} options={options} /> */}
              <div className={styles['rate-chart']}>
                <Doughnut
                  className={styles["doughnut"]}
                  data={doughnutfinalData}
                  options={doughnutOptions}
                />
                <Doughnut
                  className={styles["doughnut1"]}
                  data={doughnutfinalData2}
                  options={doughnutOptions2}
                />
              </div>
            </div>
            <div className={styles["stats-right"]}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </body>
  );
};

export default ProfilePage;