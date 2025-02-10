import { JSDOM } from "jsdom";

const pare_data = (data) => {
    const main_price = data?.main_price;
    if (!main_price) return;

    const dom = new JSDOM(main_price);
    const doc = dom.window.document;
    
    let rows = doc.querySelectorAll(".goldprice-view tbody tr");
    let goldPrices = [];

    rows.forEach(row => {
        let columns = row.querySelectorAll("td");
        let name = columns[0].querySelector(".title").textContent.trim();
        let buyPrice = columns[1].textContent.trim().replace(",", "");
        let sellPrice = columns[2].textContent.trim().replace(",", "");

        goldPrices.push({
            name: name,
            buy: parseFloat(buyPrice),
            sell: parseFloat(sellPrice)
        });
    });

    let updateTime = doc.querySelector(".update-time")?.textContent?.trim()?.replace("Cập nhập lúc: ", "") || "";

    // console.log("updateTime: " + updateTime);
    // console.log(goldPrices);
    return {
        updateTime: updateTime,
        prices: goldPrices
    };
}

export default pare_data;

