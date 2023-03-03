/*
Author: Aritra banerjee
Use: To display the table dynamically with dynamic rowspan
*/
// ===================== Important react imports
import React from 'react';
import styles from "./figmaTable.module.css";
import * as dataConstants from "./constants"

// ===================== Main function =====================
function FigmaTable() {

  const tableDataOriginal = {...dataConstants.dummyData.tableData}
  const [tableData,setTableData] = React.useState(tableDataOriginal)
  console.log("tableData: ",tableData)

  const tableKeys = Object.keys(tableData.header)

  /*
  tableData:{
    header:{
      "material":"Material",
      "site":"Site",
      "pram_name":"Parameter name",
      "current_Val":"Current Value",
      "expected_val":"Expected value",
      "rule_num":"Rule Number",
      "rule_desc": "Rule Description",
      "writeback":"Writeback",
      "comment":"Comment",
    },
    body:[...
    ],
    toggleCols:["writeback"],
    willHaveHover:["writeback"],
    inputCell:["comment"]
  }
  */

  const HeaderTag = (headerData) => {
    /*
      headerData={
        displayData="Material" ::: string
        colIndex=0 ::: number
        colKey="" ::: string
      }
    */
    return(
      <div id={`${styles.HeaderWrapperDiv}`}>
        <p id={`${styles.HeaderString}`}>{headerData.displayData}</p>
      </div>
    )
  }
  const BodyTag = (bodyData) => {
    /*
      bodyData={
        displayData="Material" ::: string
        colIndex=0 ::: number
        rowIndex=0 ::: number
        colKey="" ::: string
      }
    */
   console.log("BodyTag: ",bodyData)
    if(tableDataOriginal.inputCell.indexOf(bodyData.colKey)!=-1){
      return(
        <div id={`${styles.BodyWrapperDiv}`}>
          <input
            id={`${styles.BodyInput}`}
            defaultValue={bodyData.displayData}
            onBlur={(event)=>{
              var tempObj = {...tableData}
              tempObj.body[bodyData.rowIndex][bodyData.colKey]=event.target.value
              setTableData(tempObj)
            }}
          />
        </div>
      )
    }
    else if(tableDataOriginal.toggleCols.indexOf(bodyData.colKey)!=-1){
      return(
        <div id={`${styles.BodyWrapperDiv}`}>
          <div 
            id={`${styles.BodyToggleOuter}`} 
            style={bodyData.displayData==0 ? {justifyContent:"flex-start"}:{justifyContent:"flex-end"}} 
            onClick={()=>{
              var tempObj = {...tableData}
              tempObj.body[bodyData.rowIndex][bodyData.colKey]=bodyData.displayData==0 ? 1:0
              setTableData(tempObj)
            }}
          >
            <div id={`${styles.BodyToggleInner}`}/>
          </div>
          {tableDataOriginal.willHaveHover.indexOf(bodyData.colKey)!=-1&&bodyData.displayData==1 
            ? <div className={`${styles.BodyinfoIcon}`}>i
              <span className={`${styles.BodyinfoTooltip}`}>Tooltip text</span>
            </div>
            :""
          }
        </div>
      )
    }
    else if(tableDataOriginal.isCompare.indexOf(bodyData.colKey)!=-1){
      const comparisonValue = parseFloat(bodyData.displayData)
      const compareToValue = tableData.body[bodyData.rowIndex][tableDataOriginal.compareTo[tableDataOriginal.isCompare.indexOf(bodyData.colKey)]]
      const compareToValueParsed = compareToValue==""?0:parseFloat(compareToValue)
      debugger
      return(
        <div id={`${styles.BodyWrapperDiv}`}>
          <p 
            id={`${styles.BodyString}`} 
            style={comparisonValue>compareToValueParsed ? {color:"#107869"}:{color:"#DB1F48"}}>
            {bodyData.displayData}
          </p>
        </div>
      )
    }
    else {
      return(
        <div id={`${styles.BodyWrapperDiv}`}>
          <p id={`${styles.BodyString}`}>{bodyData.displayData}</p>
        </div>
      )
    }
  }

  // =================== Main return statement ===================
  return (
    <div id={`${styles.PageWrapper}`}>
      <table className={`${styles.tableStyles}`}>
        <thead>
          {tableKeys.map((keys,colIndex) => {
            return(
              <th>
                <HeaderTag
                  displayData={tableData.header[keys]}
                  colIndex={colIndex}
                  colKey={keys}
                />
              </th>
            )
          })}
        </thead>
        <tbody>
          {tableData.body.map((rowData,rowIndex)=>{
            return(
              <tr>
                {tableKeys.map((keys,colIndex) => {
                  return(
                    <td>
                      <BodyTag
                        displayData={rowData[keys]}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        colKey={keys}
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FigmaTable;
