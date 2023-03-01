var JSSoup = require('jssoup').default;
const http = require('http');

scrapper = async () => {

    ////////// AMAZON ///////////
    let url = "https://www.amazon.in/Dell-Inspiron-i5-1235U-39-62Cms-D560871WIN9B/dp/B0BH4SCYQ3/ref=sr_1_1_sspa?crid=DZP3SM2XBITL&keywords=dell+i5&qid=1673438956&sprefix=dell+i5%2Caps%2C311&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"

    let HEADERS = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'}

    const response = await fetch(url, {method : 'get', headers : HEADERS});
    const text = await response.text();
    // console.log(text);

    var soup = new JSSoup(text);
    amazon_img = soup.find('div', attrs = {'id' : 'imageBlock'}).find('span', attrs = {'class' : 'a-button-text'}).find('img').attrs['src']
    // console.log(souper)

    // retrieving product title
    try {
        // Outer Tag Object
        title = soup.find('span', attrs={'id': 'productTitle'})
        
        // console.log(title)
        // Inner Navigable String Object
        title_value = title.nextElement._text

        // Title as a string value
        title_string = title_value.trim().replace(',', '')
    }
    catch (AttributeError) {
        title_string = "NA"
    }

    console.log("product Title = ", title_string)

    // retrieving price
    try {
        price_symbol = soup.find("span", attrs = {'class': 'a-price-symbol'}).nextElement._text.trim().replace(',', '')
        price = soup.find("span", attrs = {'class': 'a-price-whole'}).nextElement._text.trim().replace(',', '')
        price = price_symbol + price
        // we are omitting unnecessary spaces
        // and commas form our string
    }

    catch (AttributeError) {
        price = "NA"
    }
    
    console.log("Products price = ", price)

    // retrieving product rating
    try {
        rating = soup.find("i", attrs={'class': 'a-icon a-icon-star a-star-4-5'}).nextElement._text.trim().replace(',', '')
    }
        
    catch (AttributeError) {
        try{
            rating = soup.find("span", attrs={'class': 'a-icon-alt'}).nextElement._text.trim().replace(',', '')
        }
        catch {
            rating = "NA"
        }
    }

    console.log("Overall rating = ", rating)

    try {
        review_count = soup.find("span", attrs={'id': 'acrCustomerReviewText'}).nextElement._text.trim().replace(',', '')
    }

    catch (AttributeError) {
        review_count = "NA"
    }

    console.log("Total reviews = ", review_count)

    // print availablility
    try {
        available = soup.find("div", attrs={'id': 'availability'})
        available = available.find("span").nextElement._text.trim().replace(',', '')
    }
    catch (AttributeError) {
        available = "NA"
    }

    console.log("Availability = ", available)

    ///////////// FILPKART ////////////////

    flipkart_url = "https://www.flipkart.com/search?q=" + title_string.split(' ').join('+')
    console.log(flipkart_url)
    data_fl = new JSSoup(await (await fetch(flipkart_url, {method : 'get', headers : HEADERS})).text())

    divs = data_fl.findAll('div', attrs = {'class' : '_1AtVbE'})
    // console.log(divs)
    var flip_link = undefined
    var price = 'NA'
    var rating = 'NA'

    for (i in divs) {
        div = divs[i]
        if (div.find('a', attrs = {'class' : '_1fQZEK'}) != undefined) {
            prod_box = div.find('a', attrs = {'class' : '_1fQZEK'})
            flip_link = prod_box.attrs['href']
            
            rating = prod_box.find('div', attrs = {'class' : '_3LWZlK'}).nextElement._text
            console.log(rating)

            total_ratings = prod_box.find('span', attrs = {'class' : '_2_R_DZ'}).nextElement.nextElement.nextElement._text
            console.log(total_ratings)
            reviews = prod_box.find('span', attrs = {'class' : '_13vcmD'}).nextElement.nextElement.nextElement._text
            console.log(reviews)
            Availability = (prod_box.findAll('div', attrs = {'class' : '_3G6awp'})).length > 0
            console.log(Availability)

            price = prod_box.find('div', attrs = {'class' : '_30jeq3'}).nextElement._text
            console.log(price)
            break
        }
    }

    // flipkart_url_1 = "https://www.flipkart.com" + flip_link
    
    // data_fl_1 = new JSSoup(await (await fetch(flipkart_url_1, {method : 'get', headers : HEADERS})).text())
    // divs = data_fl_1.findAll('div', attrs = {'class' : "_30jeq3"})

    // for (i in divs) {
    //     div = divs[i]
    //     if (div.attrs['class'] == "_30jeq3 _16Jk6d") price = div.nextElement._text
    // }

    // console.log(price)

}

scrapper()
