import { BarChart, Tooltip,  XAxis, YAxis, Bar } from "recharts";

const Barchart = ({width , height}) => {
  const data = [
    {
      date: "18 mon",
      present: 50,
      absent: 2,    
    
    
    },
    {
      date: "19 tue",
      present: 125,
      absent: 6,    
    
    
    }, 
    {
      date: "20 wed",
      present: 70,
      absent: 20,    
    }, 
    {
      date: "21 thur",
      present: 70,
      absent: 20,    
    }, 
    {
      date: "22 fri",
      present: 70,
      absent: 20,    
    
    
    }, 
    {
      date: "23 sat",
      present: 70,
      absent: 20,    
    }, 
    {
      date: "24 sun",
      present: 70,
      absent: 40, 
   
    }
   
  ];

return (
  <BarChart data={data} width={width} height={height}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="present" fill="#147fe4" stackId="present" barSize={6} radius={[20, 20, 0, 0]} />
    <Bar dataKey="absent" fill="#dbebfa" stackId="absent" barSize={6} radius={[20, 20, 0, 0]} />

  </BarChart>
);
};

export default Barchart;