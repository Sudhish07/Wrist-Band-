import {useEffect,useState} from "react"
import api from "../service/api"

function Dashboard(){

const[data,setData] = useState([])

useEffect(()=>{

api.get("/sensor/latest").then(res=>setData(res.data))

},[])

return(

<div>

<h1>Sensor Data</h1>

{data.map(d=>(

<div key={d.id}>

Heart Rate: {d.heart_rate}

</div>

))}

</div>

)

}

export default Dashboard