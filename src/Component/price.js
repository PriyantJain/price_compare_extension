import React, { useState, useEffect } from "react";
import Scrapper from "./scrapper";

function Price(){

    const [num, setNum] = useState([]);
 
   useEffect(()=>{

    const getData = async() => {
        const number = await Scrapper();
        setNum(number);
    }

    getData();
    
   },[]);



    return (
        <div class="container mt-3" style = {{"width" : "450px"}}> 
        <h2 class="text-center">price comparison on flipkart and amazon</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>price</th>
                    <th>rating</th>
                    <th>total_ratings</th>
                    <th>reviews</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="price">{num[0]}</td>
                    <td id="rating"> { num[1]}</td>
                    <td id="total_ratings"></td>
                    <td id="reviews"></td>
                    <td id = "Availability"></td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Price;