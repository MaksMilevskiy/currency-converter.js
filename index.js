const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const num = document.getElementById("num");
const ans = document.getElementById("ans");

const myHeaders = new Headers();
myHeaders.append("apikey", "88Ug8HoOhSXTTEAKOGFjix5RVryKt6IL")

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

    
fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then((data) => data.json())
    .then((data) => display(data.symbols))

function display(data) {
    const entries = Object.entries(data);
    for (let i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    }
}

btn.addEventListener("click", () => {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let value = num.value;

    if (currency1 != currency2) {
        convert(currency1, currency2, value);
    } else {
        alert("Choose different currency");
    }
});

function convert(currency1, currency2, value) {
    if (value > 0) {
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currency2}&from=${currency1}&amount=${value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            ans.value = result.result.toFixed(2);
        })
        .catch(err => console.log(err))
    } else {
        alert("Enter amount")
    }

}