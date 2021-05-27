// API Base URL - the server address

const BASE_URL = 'http://localhost:8080';
// Default HTTP headers for requests to the api
const HTTP_REQ_HEADERS = new Headers({
"Accept": "application/json",
"Content-Type": "application/json"
});

// Used to Initialise GET requests and permit cross origin requests

const GET_INIT = {
method: 'GET',
headers: HTTP_REQ_HEADERS,
mode: 'cors',
cache: 'default'

};

// Asynchronous Function getDataAsync from a url and return

// The init paramter defaults to GET_INIT

let getDataAsync = async (url, init = GET_INIT) => {

    // Try catch    
    try {
        // Call fetch and await the respose    
        // Initally returns a promise    
        const response = await fetch(url, init);    
        // As Resonse is dependant on the fetch call, await must also be used here
        console.log(response);    
        const json = await response.json();    
        // Output result to console (for testing purposes)    
        console.log(json);    
        // Call function( passing he json result) to display data in HTML page    
        //displayData(json);
        return json;    
        // catch and log any errors       

    } 
    catch (err)
    {    
    
        console.log(err);    
        return err;    
    }    
    }
// 1. Parse JSON

// 2. Create product rows

// 3. Display in web page

let displayPatients = (patients) => {
    // Use the Array map method to iterate through the array of products (in json format)    
    // Each products will be formated as HTML table rowsand added to the array    
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map    
    // Finally the output array is inserted as the content into the <tbody id="productRows"> element.    
    const rows = patients.map(patient => {    
    // returns a template string for each product, values are inserted using ${ }    
    // <tr> is a table row and <td> a table division represents a column    
    // product_price is converted to a Number value and displayed with two decimal places
    
    let row = `<tr>
    
    <td>${patient.fname}</td>    
    <td>${patient.l_name}</td>    
    <td>${patient.location}</td>    
    <td>${patient.dob}</td> 
    <td>${patient.illness}</td>        
    </tr>`;    
    return row;    
    });  

    // Set the innerHTML of the productRows root element = rows    
    // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)    
    document.getElementById('patientRows').innerHTML = rows.join('');    
    } // end function

// Load Products

// Get all categories and products then display

let loadPatients = async () => {

    try {    
    // get data - note only one parameter in function call    
    const patients = await getDataAsync(`${BASE_URL}/patients`);    
    //pass json data for display    
    displayPatients(patients);    
    } // catch and log any errors
    
    catch (err) {    
    console.log(err);    
    }
    
    }    
    // When this script is loaded, get things started by calling loadProducts()
    
    loadPatients();