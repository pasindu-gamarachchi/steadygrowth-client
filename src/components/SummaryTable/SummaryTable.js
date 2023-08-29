import React from 'react';
import SummaryCard from '../SummaryCard/SummaryCard';

const SummaryTable = () => {

    const oneYearData = {
        "stdDev": 34.421128441989744,
        "min": 254.59,
        "max": 385.03,
        "avg": 328.87238095238104,
        "median": {
          "close": 335.66,
          "perc_rank": 0.50199203187251
        },
        "_25perc": {
          "close": 296.93,
          "perc_rank": 0.250996015936255
        },
        "_75perc": {
          "close": 359.61,
          "perc_rank": 0.7529880478087649
        }
      }
    const threemonthData = {
        "stdDev": 18.819682325478976,
        "min": 266.69,
        "max": 336.9,
        "avg": 296.90873015873024,
        "median": {
          "close": 293.35,
          "perc_rank": 0.5
        },
        "_25perc": {
          "close": 282.93,
          "perc_rank": 0.24193548387096772
        },
        "_75perc": {
          "close": 310.48,
          "perc_rank": 0.7580645161290323
        }
      }

    const threeYearData = {
        "stdDev": 83.3630765390232,
        "min": 127.49,
        "max": 418.97,
        "avg": 271.2555039787796,
        "median": {
          "close": 291.57,
          "perc_rank": 0.50066401062417
        },
        "_25perc": {
          "close": 185.68,
          "perc_rank": 0.249667994687915
        },
        "_75perc": {
          "close": 346.71,
          "perc_rank": 0.750332005312085
        }
      }

    const minData = {"name": "min", "3mo": threemonthData.min, "1y": oneYearData.min, "3y": threeYearData.min}
    
    const assembleData = (threeMonth, oneYear, threeYear, stat, isNested=false)=>{
        const statObj = {
            name: stat,
            "3mo": isNested? threeMonth[stat]["close"]: threeMonth[stat] ,
            "1y":  isNested? oneYear[stat]["close"]: oneYear[stat] ,
            "3y":  isNested? threeYear[stat]["close"]: threeYear[stat] 

        }
        console.log(`StatObj --> ${statObj}`);
        return statObj;

    }

    return (
        <div>
            <div>
                <SummaryCard statsObj={assembleData(threemonthData, oneYearData, threeYearData, "min")}/>
                <SummaryCard statsObj={assembleData(threemonthData, oneYearData, threeYearData, "max")}/>
                <SummaryCard statsObj={assembleData(threemonthData, oneYearData, threeYearData, "avg")}/>
                <SummaryCard statsObj={assembleData(threemonthData, oneYearData, threeYearData, "median", true)}/>
                <SummaryCard statsObj={assembleData(threemonthData, oneYearData, threeYearData, "_25perc", true)}/>
                <SummaryCard statsObj={assembleData(threemonthData, oneYearData, threeYearData, "_75perc", true)}/>

            </div>
        </div>
    );
};

export default SummaryTable;