/*
Author: Aritra banerjee
Use: To display the table dynamically with dynamic rowspan
*/
// ===================== Important react imports
import React from 'react';
import styles from "./TablePage.module.css";
import * as dataConstants from "./constants"

// ===================== Main function =====================
function TablePage() {

  // =================== Constants and variable
  const tableData=dataConstants.dataStructure // to store the tabledata in local variable
  const cloneDeep=require('clone-deep'); // defining a constant to have the clone deep functionality
  const tableBody = cloneDeep(tableData.body) // storing the array of key value pair objects(list of row in key value pair)
  const keys=Object.keys(tableData.header) // constant to store the keys of every header
  var rowSpan = keys.map(() => 1) // An array variable to count the rowspan
  const [clickedRows,setClcikedRows] = React.useState([]) // An list to store the list of rows clicked

  // =================== Functions
  const SpanFinder = (rowIndex,colIndex) => {
    /*
      Input is the current cell's row and column indexes 
      and the output is the current cells occurence in the column(i.e. the rowspan)
    */
    const elementval = tableBody[rowIndex][keys[colIndex]] // storing the string value of the cell
    var index=cloneDeep(rowIndex) /* variable for looping,
    stores the row index which goes in increasing till the value stopps matching */
    while (index<tableBody.length&&elementval==tableBody[index][keys[colIndex]]) {
      index++
    }
    rowSpan[colIndex]=index-rowIndex // updating the list with the new rowspan of each cell
    return index-rowIndex
  }
  const CellClicked = (rowIndex,colIndex) => {
    /*
      Unfinished function to store the clicked cells
    */
    var tempList = cloneDeep(clickedRows)
    var isPresent = clickedRows.filter((obj) => {
      if(JSON.stringify(tableBody[rowIndex])==JSON.stringify(obj))
        return obj
    })
    if(Object.keys(isPresent).length==0){
      for(let i=0;i<SpanFinder(rowIndex,colIndex);i++){
        tempList.push(tableBody[rowIndex+i])
      }
    }
    setClcikedRows(tempList)
  }

  // =================== Main return statement ===================
  return (
    <div id={`${styles.PageWrapper}`}>
      <table className={`${styles.TableDynamic}`}>
        {/* table header */}
        <thead>
          {keys.map((element) => {
            return <th>{element}</th>
          })}
        </thead>
        {/* table body */}
        <tbody>
          {dataConstants.dataStructure.body.map((row,rowIndex) => <tr>
            {keys.map((elementKey,colIndex) => {
              if(rowSpan[colIndex]>1){
                /*
                 subtracting the column span value by 1 each time the row increases
                 for the next time when the row number increases the cell ignores rowspan cells
                */
                rowSpan[colIndex]--
              }
              else{
                return <td rowSpan={SpanFinder(rowIndex,colIndex)} onClick={() => CellClicked(rowIndex,colIndex)}>
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
