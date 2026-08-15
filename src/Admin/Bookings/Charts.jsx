import { ArrowDown, ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

export const Charts = () => {

    
    // const months = Array.from({ length: 12 }, (_, i) =>
    // new Date(2026, i, 1).toLocaleString("en-US", { month: "long" })
    // );
    const [selectedMonth, setSelectedmonth] = useState(null);

    const months= [
        {   id:1,
            month:"January"
        },{id:2,
            month:"Ferbuary"
        },{
            id:3,
            month:"March"
        },{
            id:4,
            month:"April"
        },{
            id:5,
            month:"May"
        },{
            id:6,
            month:"June"
        },{
            id:7,
            month:"July"
        },{
            id:8,
            month:"August"
        },{
            id:9,
            month:"September"
        },{
            id:10,
            month:"October"
        },{
            id:11,
            month:"November"
        },{
            id:12,
            month:"December"
        },
    ]

    const booking = new Date(). toISOString().split("T")[0];
    const bookingDate = new Date(booking);
    const bookingMonth = bookingDate.getMonth() + 1;
    const bookingYear = bookingDate.getFullYear()

    // console.log(bookingYear);
    const selectMonth = async(mon)=> {
        setSelectedmonth(mon.id);
    }
  return (
    <div>
        <div>
          {/* year */}
           <select name="" id="">
             
           </select>
          {/* months */}
          <div name="" id="" className='border h-8 rounded-md border-slate-300'>
            {months.map((mon)=> {
                if(mon.id <= bookingMonth){
                    return(
                     <button key={mon.id} value={selectedMonth === 0 ? bookingMonth : selectedMonth} onClick={()=> selectMonth(mon)}>{mon.month}</button>
                    );
                }
            })}
          </div>
          {/* date */}
        </div>

        <div className='border w-full h-50 border-slate-300 rounded-2xl'>
           <p>{bookingMonth.months}</p>
        </div>
    </div>
  )
}
