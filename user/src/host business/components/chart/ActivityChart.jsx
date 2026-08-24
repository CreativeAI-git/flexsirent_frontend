// components/ActivityChart.jsx
import ReactApexChart from "react-apexcharts";

const ActivityChart = () => {
  const series = [
    {
      name: "Activity",
      data: [400, 300, 600, 800, 500, 700, 900, 500, 700, 900, 700, 900],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    title: {
      text: "Activity Overview",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 5,
    },
    colors: ["#ff8000"],
    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        <div id="activity_chart" className="mx-auto">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
