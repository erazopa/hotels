import { requestingHotels } from "./hotels.js";

// defino constantes
const main = document.getElementById("cardContainer");
const filterprice = document.getElementById("filter-price");
const checkin = document.getElementById("filter-date-from");
const checkout = document.getElementById("filter-date-to");
const today = new Date();

// llamamos los datos para que impriman en pantalla
window.addEventListener("load", async () => {
  const respuesta = await requestingHotels();
  const data = await respuesta.json();

  // creacion de container para las cards
  const section = document.createElement("section");
  section.className = "section-cards";
  main.appendChild(section);

  // llamo a la section para usar el innerHTML
  const sectioncart = document.querySelector(".section-cards");
  
  // arreglo fecha adiciono el 0
  
  function addZeroDate(fecha) {
    const convText = "" + fecha;
    if (convText.length === 1) {
      return "0" + fecha;
    } else {
      return fecha;
    }
  }

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const fechaCheckin = year + "-" + addZeroDate(month) + "-" + addZeroDate(day);
  const fechaCheckout =
    year + "-" + addZeroDate(month) + "-" + addZeroDate(day + 1);

  checkin.setAttribute("min", fechaCheckin);
  checkout.setAttribute("min", fechaCheckout);

  // traemos el arreglo de los hoteles y desarrollo de las cards
  const renderdata = (hotel) => {
    hotel.forEach((hotel) => {
      const cardHotels = document.createElement("div");
      cardHotels.className = "card";
      section.appendChild(cardHotels);
      // desarrollo cards
      const imagenhotel = document.createElement("img");
      imagenhotel.setAttribute("src", hotel.photo);
      imagenhotel.setAttribute("alt", hotel.name);
      imagenhotel.className = "imghotel";
      cardHotels.appendChild(imagenhotel);

      const nombreHotel = document.createElement("h2");
      nombreHotel.innerText = hotel.name;
      nombreHotel.className = "Hotel_name";
      cardHotels.appendChild(nombreHotel);

      const cardInfo = document.createElement("section");
      cardInfo.className = "HotelCard__Info";
      cardHotels.appendChild(cardInfo);

      const countryName = document.createElement("div");
      countryName.className = "HotelCard__Country_Numbers";
      cardInfo.appendChild(countryName);

      const country = document.createElement("div");
      country.className = "HotelCard__Country";
      countryName.appendChild(country);

      const countryText = document.createElement("h1");
      countryText.className = "HotelCard__CountryName";
      countryText.innerText = hotel.country;
      country.appendChild(countryText);

      const flaghotel = document.createElement("img");
      flaghotel.className = "Hotel_Flag";
      if (hotel.country == "Argentina") {
        flaghotel.setAttribute("src", "imagenes/argentina.png");
      } else if (hotel.country == "Brasil") {
        flaghotel.setAttribute("src", "imagenes/brasil.png");
      } else if (hotel.country == "Chile") {
        flaghotel.setAttribute("src", "imagenes/chile.png");
      } else if (hotel.country == "Uruguay") {
        flaghotel.setAttribute("src", "imagenes/uruguay.png");
      }

      country.appendChild(flaghotel);

      const roomhotel = document.createElement("div");
      roomhotel.innerText = hotel.rooms;
      roomhotel.className = "HotelCard_Room";
      country.appendChild(roomhotel);

      const room = document.createElement("p");
      room.className = "room_Stock";
      room.innerHTML = "rooms";
      country.appendChild(room);

      const roomData = document.createElement("p");
      roomData.className = "romm_";
      roomData.innerHTML = "-";
      country.appendChild(roomData);

      const pricehotel = document.createElement("div");
      pricehotel.innerText = hotel.price;
      pricehotel.className = "HotelCard_Price";
      country.appendChild(pricehotel);

      const price = document.createElement("p");
      price.className = "Hotel_price";
      if (hotel.price == 1) {
        price.innerText = "$";
      } else if (hotel.price == 2) {
        price.innerText = "$$";
      } else if (hotel.price == 3) {
        price.innerText = "$$$";
      } else if (hotel.price == 4) {
        price.innerText = "$$$$";
      }
      country.appendChild(price);
    });
  };

  // trabajando filtro fecha api hoteles
  renderdata(data);
  const filterDate = () => {
    const from = new Date(checkin.value);
    const formatfrom = new Date(
      from.getTime() + from.getTimezoneOffset() * 60000
    );
        const to = new Date(checkout.value);
    const formatto = new Date(
      to.getTime() + to.getTimezoneOffset() * 60000);
      
    const mls = formatto - formatfrom;
    const filterDays = mls / (1000 * 60 * 60 * 24);
    // console.log(filterDays);
    const fData = data.filter((hotel) => mls >= hotel.availabilityTo);
    console.log(fData);
    sectioncart.innerHTML="";
    
    return renderdata(fData);
  };

  // filtro precios
  // renderdata(data);
  const filterHotel = () => {
    const pricehotels = data.filter(
      (hotel) => filterprice.value == hotel.price
    );
    sectioncart.innerHTML = "";
    renderdata(pricehotels);
    console.log(pricehotels);
    if (filterprice.value == "0") {
      renderdata(data);
    }
    return pricehotels;

  };
// creacion de funcion para unir las funciones de filtros
  // const addfilters = () => {
  //   const totalfilters = filterHotel() && filterDate();
  //   sectioncart.innerHTML = "";
  //   // return
  //   renderdata(totalfilters);
  //   console.log(addfilters);
  // };

  filterprice.addEventListener("change", filterHotel);
  checkin.addEventListener("change", filterDate);
  checkout.addEventListener("change", filterDate);
});
