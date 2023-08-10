import { requestingHotels } from "./hotels.js";

const buttonConsulta = document.getElementById("filter-country");
const main = document.getElementById("cardContainer");

buttonConsulta.addEventListener("click", async () => {
  const respuesta = await requestingHotels();
  const data = await respuesta.json();
  console.log(data[0].photo);
  // prueba
  const section = document.createElement("section");
  section.className = "section-cards";
  main.appendChild(section);

  // prueba
  data.forEach((hotel) => {
    const cardHotels = document.createElement("div");
    cardHotels.className = "card";
    section.appendChild(cardHotels);

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
});
