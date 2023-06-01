import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { TABLEDATA } from "./data/config";
import { sortHandler } from "./utlis/sortHandler";
export const DataTable = () => {
  const [data, setData] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [rTypeData, setrTypeData] = useState([]);
  const [reportTypeData, setReportTypeData] = useState('Sale Report');
  const [totalData, setTotalData] = useState();
  const [sort, setSort] = useState("dsc");
  const [sortTitle, setSortTitle] = useState("");
  const [limit, setLimit] = useState(10);


  useEffect(() => {

    (async () => {
     try{
      const res = await fetch(`http://localhost:7070/api/v1/mis?report_type=Sale Report&limit=10&offset=0`);
      const json = await res.json();
     // console.log(json?.result?.rows?.rows);
      let resData=json?.result?.rows?.rows;
       setData(resData);
       setSorted(resData);
       setTotalData(json?.result?.rows?.count);

      let CSVData = resData.map(({ report_type, name, data1, data2, data3, data4, data5 }) => {
        return [report_type, name, data1, data2, data3, data4, data5];
      });

      setCsvData((p) => {
        return [[...TABLEDATA?.headings], ...CSVData, ...p];
      });
    }
     catch(error)
     {  
      console.log("Error");
     }  
    })();
    // getting distinct report type
    (async () => {
      try{
       const res = await fetch(`http://localhost:7070/api/v1/report-type`);
       const json = await res.json();
      
        console.log(json?.result);
        setrTypeData(json?.result);
      //  let resData=json?.result?.rows?.rows;
      //   setData(resData);
      //   setSorted(resData);
      }
      catch(error)
      {  
       console.log("Error");
      }  
     })();


  }, []);

  const getData = async (type,limit)=>
  {
    try{

      const res = await fetch(`http://localhost:7070/api/v1/mis?report_type=${type}&limit=${limit}&offset=0`);
      const json = await res.json();
      console.log(json?.result?.rows);
      let resData=json?.result?.rows?.rows;
       setData(resData);
       setSorted(resData);
       setTotalData(json?.result?.rows?.count);

      let CSVData = resData.map(({ report_type, name, data1, data2, data3, data4, data5 }) => {
        return [report_type, name, data1, data2, data3, data4, data5];
      });

      setCsvData((p) => {
        return [[...TABLEDATA?.headings], ...CSVData, ...p];
      });
    }
     catch(error)
     {  
      console.log("Error");
     }
  }

 // 
 const handleOnChange=async(e)=>
{
  setReportTypeData(e.target.value)
  await getData(e.target.value,limit);
}
const clickHandler =async(value)=>
{
  setLimit(value);
  console.log(value);
  await getData(reportTypeData,value);
}

  // useEffect(() => {
  //   if (!sort) return;
  //   let res = sortHandler(data, sort);
  //   setSorted(res);
  // }, [sort, data]);

  useEffect(() => {
    if (!sort) return;
    let res = sortHandler(data, sortTitle, sort);
    setSorted(res);
  }, [sort, data, sortTitle]);

  // const sortTableHandler = () => {
  //   if (sort === "asc") setSort("dsc");
  //   else setSort("asc");
  // };

  const sortTableHandler = (slug) => {
    setSortTitle(slug);
    if (sort === "asc") setSort("dsc");
    else setSort("asc");
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            {TABLEDATA?.headings?.map((item) => {
              return (
                <th style={{cursor:"pointer"}} onClick={() => sortTableHandler(item)} key={item}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map(({ id, report_type,name, data1, data2, data3, data4, data5}, idx) => {
            return (
              <tr key={id}>
                <th scope="row">{idx + 1}</th>
                <td>{report_type}</td>
                <td>{name}</td>
                <td>{data1}</td>
                <td>{data2}</td>
                <td>{data3}</td>
                <td>{data4}</td>
                <td>{data5}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

     
     <div className="container"> 
      <div className="row"> 
      <div className="col-md-4"> 
          
      <select className="form-select" aria-label="Default select example" onChange={handleOnChange}>
      <option >Open this select menu</option>
      { 
      rTypeData.map(({ report_type}, idx) => {
              if(reportTypeData==report_type)
              {

              }
            return (
                    <option value={report_type} >{report_type}</option>
                   
                  );
           })}
    </select>
    </div>
    <div className="col-md-4"> 
    <CSVLink data={csvData}>Download CSV</CSVLink>

    </div>
    <div className="col-md-4"> 
           Total Records : {totalData> 10 ? <button onClick={()=>{clickHandler(totalData)}} > {totalData} View All</button> : totalData }
          
    
    </div>
    </div>
    </div>
    </>
  );
};
