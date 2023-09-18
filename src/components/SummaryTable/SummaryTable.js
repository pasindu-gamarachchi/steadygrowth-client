import { useState, useEffect } from 'react';
import SummaryCard from '../SummaryCard/SummaryCard';
import axios from 'axios';
import "./SummaryTable.scss";

const BASEURL = process.env.REACT_APP_SERVER_URL; 


const SummaryTable = ({symb}) => {

  const [threeMonthData, setthreeMonthData] = useState({});
  const [oneYearData, setoneYearData] = useState({});
  const [threeYearData, setthreeYearData] = useState({});
  const [isLoading, setisLoading] = useState(true);


  useEffect(() => {
    axios
        .get(`${BASEURL}/api/baseStats/${symb}?from=2022-09-16&to=2023-09-16`)
        .then((resp) =>{
            const newChartData = resp.data;
            setoneYearData(newChartData);
            return axios
                .get(`${BASEURL}/api/baseStats/${symb}?from=2023-06-16&to=2023-09-16`);
        })
        .then((resp)=>{
            //console.log(resp.data);
            const newChartData2 = resp.data;
            setthreeMonthData(newChartData2);
            return axios
                .get(`${BASEURL}/api/baseStats/${symb}?from=2020-09-16&to=2023-09-16`);
        }).then((resp)=>{
            //console.log(resp.data);
            setthreeYearData(resp.data);
            setisLoading(false);
        })
        .catch((err)=>{
            console.error(err);
        }
        )
  }, [symb]
  )
    
  const assembleData = (threeMonth, oneYear, threeYear, stat, isNested=false)=>{
      const statObj = {
          name: stat,
          "3mo": isNested? threeMonth[stat]["close"]: threeMonth[stat] ,
          "1y":  isNested? oneYear[stat]["close"]: oneYear[stat] ,
          "3y":  isNested? threeYear[stat]["close"]: threeYear[stat] 

      }
      //console.log(`StatObj --> ${statObj}`);
      return statObj;

  }

  if (isLoading){
    return <p>Loading...</p>
  }

  return (
      <div>
          <div className='summaryTableMain'>
              <SummaryCard statsObj={null} isColName={true}/>
              <SummaryCard statsObj={assembleData(threeMonthData, oneYearData, threeYearData, "min")}/>
              <SummaryCard statsObj={assembleData(threeMonthData, oneYearData, threeYearData, "max")}/>
              <SummaryCard statsObj={assembleData(threeMonthData, oneYearData, threeYearData, "avg")}/>
              <SummaryCard statsObj={assembleData(threeMonthData, oneYearData, threeYearData, "median", true)}/>
              <SummaryCard statsObj={assembleData(threeMonthData, oneYearData, threeYearData, "_25perc", true)}/>
              <SummaryCard statsObj={assembleData(threeMonthData, oneYearData, threeYearData, "_75perc", true)}/>

          </div>
      </div>
  );
};

export default SummaryTable;