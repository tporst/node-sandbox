console.log("static resoruce js");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const output = document.querySelector("#output");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submited" + search.value);
  output.textContent = "loading";
  //let temperature =
  fetch("http://localhost:3000/weather?address=" + search.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.temperatur) {
          output.textContent = "temperature is " + data.temperatur;
          console.log(data);
        } else {
          output.textContent = data.error;
        }
      });
    }
  );
});
