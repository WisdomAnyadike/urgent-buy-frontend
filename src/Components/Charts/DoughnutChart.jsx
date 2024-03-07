import { Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, );



const Doughnutchart = ({data , style}) => {


  
 
  return (
    <div className={style} style={{height:'180px'}}>   <Doughnut data={data} /> </div>
  
  )
}

export default Doughnutchart