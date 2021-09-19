import React from "react";

const requestOptions = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {'Content-Type': 'application/json'},
}

const postData = async (url, data) => {
    try {
        const response = await fetch("http://localhost:3000/" + url, {
               ...requestOptions,
                body: JSON.stringify(data),
            })
        return await response.json();
    } catch(err){
        return console.log(err)
    }
}

const getData = async (url) => {
    try {
        const response = await fetch("http://localhost:3000/" + url,
            requestOptions
        );
        return await response.json();
    } catch(err){
        return console.log(err)
    }
}

export {
    getData,
    postData
}
