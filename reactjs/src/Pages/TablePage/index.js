import React from 'react';
import styles from "./TablePage.module.css";
import * as dataConstants from "./constants"

function TablePage() {

  console.log("dataConstants: ",dataConstants.dataStructure)
  const tableData=dataConstants.dataStructure
  const cloneDeep=require('clone-deep');
  const tableBody = cloneDeep(tableData.body)
  const keys=Object.keys(tableData.header)
  var rowSpan = keys.map(() => 1)

  const SpanFinder = (rowIndex,colIndex) => {
    console.log("SpanFinder:- \nrowIndex: ",rowIndex,"\ncolIndex: ",colIndex)
    var spanCount = 0
    const elementval = tableBody[rowIndex][keys[colIndex]]
    var index=cloneDeep(rowIndex)
    console.log("SpanFinder:- \nelementval: ",elementval,"\nindex: ",index,"\ntableBody[index][keys[colIndex]]: ",tableBody[index][keys[colIndex]])
    while (index<tableBody.length&&elementval==tableBody[index][keys[colIndex]]) {
      spanCount=spanCount+1
      index=index+1
    }
    rowSpan[colIndex]=spanCount
    return spanCount
  }

  return (
    <div id={`${styles.PageWrapper}`}>
      <table className={`${styles.TableDynamic}`}>
        <thead>
          {keys.map((element,rowIndex) => {
            return <th>{element}</th>
          })}
        </thead>
        <tbody>
          {dataConstants.dataStructure.body.map((row,rowIndex) => <tr>
            {keys.map((elementKey,colIndex) => {
              if(rowSpan[colIndex]>1){
                rowSpan[colIndex]=rowSpan[colIndex]-1
              }
              else{
                return <td rowSpan={SpanFinder(rowIndex,colIndex)}>
                {row[elementKey]}
              </td>
              }
            })}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default TablePage;
