import React,{useEffect} from "react";
import JSSoup from 'jssoup';
import axios from 'axios';

const Scrapper = async () => {
//   ////////// AMAZON ///////////
  let url = "https://www.amazon.in/Dell-Inspiron-i5-1235U-39-62Cms-D560871WIN9B/dp/B0BH4SCYQ3/ref=sr_1_1_sspa?crid=DZP3SM2XBITL&keywords=dell+i5&qid=1673438956&sprefix=dell+i5%2Caps%2C311&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"

  let HEADERS = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5' }

  let response = await axios(url, { method: 'GET', headers: HEADERS });
  let text = await response.text();
    //   console.log(text);

  let soup = new JSSoup(text);
  let amazon_img = soup.find('div', {'id': 'imageBlock'}).find('span', {'class': 'a-button-text' }).find('img').attrs['src']

  // retrieving product title
  try {
    // Outer Tag Object
    let title = soup.find('span', { 'id': 'productTitle' })

    // Inner Navigable String Object
    let title_value = title.nextElement._text

    // Title as a string value
    let title_string = title_value.trim().replace(',', '')
    console.log("product Title = ", title_string)
  }
  catch (AttributeError) {
    let title_string = "NA"
  }

  // retrieving price
  let price = "NA"
  try {
    let price_symbol = soup.find("span", { 'class': 'a-price-symbol' }).nextElement._text.trim().replace(',', '')
    price = soup.find("span", { 'class': 'a-price-whole' }).nextElement._text.trim().replace(',', '')
    price = price_symbol + price
    // we are omitting unnecessary spaces
    // and commas form our string
    console.log("Products price = ", price)
  }
  catch (AttributeError) {
    price = "NA"
  }

  // retrieving product rating
  let rating = "NA"
  try {
    rating = soup.find("i", { 'class': 'a-icon a-icon-star a-star-4-5' }).nextElement._text.trim().replace(',', '')
    console.log("Overall rating = ", rating)
  }

  catch (AttributeError) {
    try {
      rating = soup.find("span", { 'class': 'a-icon-alt' }).nextElement._text.trim().replace(',', '')
      console.log("Overall rating = ", rating)
    }
    catch {
      rating = "NA"
    }
  }

  try {
    let review_count = soup.find("span",  { 'id': 'acrCustomerReviewText' }).nextElement._text.trim().replace(',', '')
    console.log("Total reviews = ", review_count)
  }
  catch (AttributeError) {
    let review_count = "NA"
  }

    console.log("Flipkart price = ", price);
    console.log("Flipkart rating = ", rating);
    // console.log("Flipkart link = ", flip_link);
    return [price, rating];
}

export default Scrapper;
