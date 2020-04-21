window.onload = function() {
  let enterText = document.querySelector(".enter__text");

  enterText.addEventListener("click", () => {
    enterText.setAttribute("contenteditable", "true");
  });

  document
    .querySelector(".translate__btn")
    .addEventListener("click", function(ev) {
      ev.preventDefault();

      let req = new XMLHttpRequest();
      let resultText = document.querySelector(".result__text");
      let textTranslate = enterText.innerText;
      let enterLanguage = document.querySelector(".enter__language").value;
      let resultLanguage = document.querySelector(".result__language").value;

      let API_KEY =
        "trnsl.1.1.20191225T110608Z.153939b769426a7f.3d2aaa891acd17272ad2b298f8cf4e3140a383fd";
      let url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
      url += "?key=" + API_KEY;
      url += "&text=" + textTranslate;
      url += "&lang=" + enterLanguage + "-" + resultLanguage;

      req.addEventListener("load", function() {
        let response = JSON.parse(req.response);

        if (response.code !== 200) {
          resultText.innerHTML =
            "Произошла ошибка при получении ответа от сервера:\n\n" +
            response.message;
          return;
        }

        if (response.text.length === 0) {
          resultText.innerHTML =
            "К сожалению, перевод для данного слова не найден";
          return;
        }

        resultText.innerHTML = response.text.join("<br>");
      });

      req.open("get", url);
      req.send();
    });
};
