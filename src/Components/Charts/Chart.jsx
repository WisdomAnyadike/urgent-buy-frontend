import React from 'react'
import { LineChart,  Tooltip, CartesianGrid, Line } from "recharts"


 
    

const Chart = ( {data , name , percent , time , value , valueprops }) => {
  return (
  

            <div className="rounded d-flex align-items-end w-100 justify-content-between" style={{ height: "130px",backgroundColor:"white" }}>
                <div className="d-flex flex-column h-100 justify-content-between p-2">
                    <span> <small> {name} </small>  </span>
                    <h2 className={valueprops}> {value} </h2>
                    <small className="text-secondary"> <small> {percent} from {time} </small>  </small>
    
                </div>
                <div className="pe-2 w-50 h-100 d-flex align-items-center justify-content-center"> 
                <LineChart width={100} height={100} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone"  dataKey="pv" stroke="#387908" yAxisId={1} />
                </LineChart>  </div>
    
    
            </div>
        )
  
}

export default Chart