import React from "react";
import { tableData } from "./data";
import Table from "../components/table/table";
import './../index.css'

const Mytable = ()=>{
    function formatCurrencyIndia(amount) {
        
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(amount).slice(0,-3);
    }
    function formatCurrencyIndiaWithoutSymbol(amount) {
        // Round the number to the nearest integer
        const roundedAmount = Math.round(amount);
      
        // Format the number using Indian number system (commas after every two digits)
        return new Intl.NumberFormat('en-IN').format(roundedAmount);
      }
    const requiredData = tableData.map(({ 's.no': sNo, 'amt.pledged': amtPledged, 'percentage.funded': percentageFunded }) => {
        return {
            'S.No.': sNo,
            'Amount pledged': formatCurrencyIndia(amtPledged),
            'Percentage funded': `${formatCurrencyIndiaWithoutSymbol(percentageFunded)}%`
        };
    });
    
    const columns = Object.keys(requiredData[0])
    const rows = requiredData.map((row)=>Object.values(row));

    return <>
        <div className="table_container">
            <Table columns={columns} rows={rows}></Table>
        </div>
    </>
}

export default Mytable;