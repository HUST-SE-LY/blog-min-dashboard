/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import dataSVG from "../assets/data.svg";
import { observer } from "mobx-react-lite";
import Header from "./common/Header";
import { getAllDates } from "../utils/requests";
import store from "../store";
function Data() {
  const [showAnimate, setShowAnimate] = useState(false);
  const [showApp, setShowApp] = useState(false);
  function initApp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setShowAnimate(true);
    setTimeout(() => {
      setShowApp(true);
    }, 500);
  }
  return (
    <>
      <div className="relative flex gap-[5px] flex-col justify-center items-center">
        <div
          onClick={(e) => {
            initApp(e);
          }}
          className="cursor-pointer flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px] max-sm:rounded-[15px] w-[80px] relative h-[80px] rounded-[20px] bg-white"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={` transition-all duration-500 bg-transparent w-[1px] h-[1px] absolute top-[40px] left-[40px] ${
              showAnimate ? "bg-white scale-x-[3000] scale-y-[1500]" : "scale-0"
            } ${showApp ? "" : "z-[9999]"}`}
          ></div>
          <img
            src={dataSVG}
            className={`transition-all max-sm:w-[30px] max-sm:h-[30px] delay-[250ms] ${
              showAnimate
                ? "opacity-0 scale-[2] rotate-45"
                : "opacity-[1] scale-[1]"
            }`}
            alt=""
          />
        </div>
        <p className="text-white text-sm">数据</p>
      </div>
      {showApp ? (
        <DataDetail
          onSetShowAnimate={setShowAnimate}
          onSetShowApp={setShowApp}
        />
      ) : null}
    </>
  );
}

function DataDetail(props: commonAppProps) {
  const calendarMapContainer = useRef<HTMLDivElement>(null);
  const histogramContainer = useRef<HTMLDivElement>(null);
  const lineChartContainer = useRef<HTMLDivElement>(null);
  async function getCalendarData(year: number) {
    const date = +echarts.time.parse(year + "-01-01");
    const end = +echarts.time.parse(+year + 1 + "-01-01");
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    const result = (await getAllDates()) as getAllDatesRes;
    const dateArray = result.data.dates;
    for (let time = date; time < end; time += dayTime) {
      let num = 0;
      const currentTime = echarts.time.format(time, "{yyyy}-{MM}-{dd}", false);
      for (let i = 0; i < dateArray.length; i++) {
        if (currentTime === dateArray[i].date.split("T")[0]) {
          num++;
        }
      }
      data.push([echarts.time.format(time, "{yyyy}-{MM}-{dd}", false), num]);
    }
    return data;
  }
  async function getHistogramData() {
    const res = (await getAllDates()) as getAllDatesRes;
    const dates = res.data.dates;
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dates.forEach((dataInfo) => {
      const month = dataInfo.date.split("-")[1];
      switch (month) {
        case "01":
          data[0]++;
          break;
        case "02":
          data[1]++;
          break;
        case "03":
          data[2]++;
          break;
        case "04":
          data[3]++;
          break;
        case "05":
          data[4]++;
          break;
        case "06":
          data[5]++;
          break;
        case "07":
          data[6]++;
          break;
        case "08":
          data[7]++;
          break;
        case "09":
          data[8]++;
          break;
        case "10":
          data[9]++;
          break;
        case "11":
          data[10]++;
          break;
        case "12":
          data[11]++;
          break;
        default:
          break;
      }
    });
    return data;
  }

  async function init() {
    const calendar = calendarMapContainer.current as HTMLDivElement;
    const histogram = histogramContainer.current as HTMLDivElement;
    const line = lineChartContainer.current as HTMLDivElement;
    const calendarChart = echarts.init(calendar, "light");
    const histogramChart = echarts.init(histogram, "light");
    const lineChart = echarts.init(line, "light");
    const year = new Date().getFullYear();
    const calendarData = await getCalendarData(year);
    const histogramData = await getHistogramData();
    const histogramOption = {
      title: {
        top: 0,
        left: "center",
        text: "按月统计",
      },
      tooltip: {

      },
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: histogramData,
          type: "bar",
          itemStyle: {
            barBorderRadius: [5,5,0,0],
          },
          label: {
            show: true,
            offset: [0,-5],
            position: "top",
          },

        },
      ],
    };
    const calendarOption = {
      title: {
        top: 0,
        left: "center",
        text: "博客上传记录",
      },
      tooltip: {},
      visualMap: {
        type: "piecewise",
        categories: [0, 1, 2, 3, 4, 5],
        max: 5,
        orient: "horizontal",
        left: "center",
        top: 30,
        inRange: {
          color: [
            "#ebedf0",
            "#9be9a8",
            "#40c463",
            "#30a14e",
            "#216e39",
            "#115e24",
          ],
        },
      },
      calendar: {
        top: 80,
        left: 30,
        right: 30,
        cellSize: ["auto", "auto"],
        range: "2023",
        itemStyle: {
          borderWidth: 2,
          borderColor: "rgba(255,255,255,0)",
          
        },
        yearLabel: { show: false },
        splitLine: { show: false },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: calendarData,
      },
    };
    const lineChartOption = {
      title: {
        top: 0,
        left: "center",
        text: "按月统计",
      },
      tooltip:{},
      xAxis: {
        type: 'category',
        data: ["一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: histogramData,
          type: 'line',
          label: {
            show: true,
            offset: [0,-5],
            position: "top",
          },
          smooth: true
        }
      ]
    }
    histogramChart.setOption(histogramOption);
    calendarChart.setOption(calendarOption);
    lineChart.setOption(lineChartOption);

    window.addEventListener("resize", () => {
      calendarChart.resize();
    });
  }
  useEffect(() => {
    try {
      init();
    } catch(err) {
      store.addToast("获取数据失败")
    }
    
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0  w-full h-full bg-white z-[100]"
    >
      <Header title="博客数据" {...props} />
      <div className="h-[calc(100vh_-_50px)] w-full p-[1rem] overflow-y-auto">
        <div
          ref={calendarMapContainer}
          className="bg-white w-[900px] h-[200px] mx-[auto] mb-[50px]"
        ></div>
        <div
          ref={histogramContainer}
          className="bg-white w-[900px] h-[300px] mx-[auto] mb-[50px]"
        ></div>
        <div
          ref={lineChartContainer}
          className="bg-white w-[900px] h-[300px] mx-[auto] mb-[50px]"
        ></div>
      </div>
    </div>
  );
}

export default observer(Data);
