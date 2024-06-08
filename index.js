const express = require("express");
const path = require("path")
const app = express();
const { v4: uuidv4 } = require('uuid');
 let port = 3000;

 app.use(express.static("public"));
 app.set("view engine","ejs");
 app.set("views",path.join(__dirname,"/views")); 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const bodyParser = require("body-parser");

 
app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true })); // for URL-encoded data


function formatTime(time) {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}
function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year.slice(2)}`;
}


app.get("/book", (req, res) => {
    const { date, time, location } = req.query;
    const formattedTime = formatTime(time);
    const formattedDate = formatDate(date);
    let id = uuidv4();  
    res.render("tablebooked.ejs", { 
        id:id,
        date:formattedDate,
        time: formattedTime,
        location: location});
});

app.get("/hotel", (req, res) => {
    res.render("hotelbooking.ejs");
});
function getPricePerRoom(hotelType) {
    const prices = {
        standard: 100,
        deluxe: 150,
        suite: 200,
    };
    return prices[hotelType] || 0;
}
app.post('/book-hotel', (req, res) => {
    const { name,hotelType, adults, children, rooms,checkInDate,checkOutDate} = req.body;
    const formattedCheckInDate = formatDate(checkInDate);
    const formattedCheckOutDate = formatDate(checkOutDate);
    const pricePerRoom = getPricePerRoom(hotelType);
    const totalPrice = pricePerRoom * rooms;
    const advanceAmount = totalPrice * 0.4; // 40% of total price
    res.render('payment', { name, hotelType, adults, children, rooms, totalPrice, advanceAmount,formattedCheckInDate,formattedCheckOutDate });
});



app.listen(port,()=>{
    console.log(`Server listening at ${port}`)
 });
