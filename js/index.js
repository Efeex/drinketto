$(function () {
  var beerCardTpl = Handlebars.compile($("#beer-card").html()),
    container = $("#drink-container")
  //prima chiamata per le bevande
  $.getJSON({
    url: 'https://lcboapi.com/products?order=id',
    headers: {
      'Authorization': 'Token MDo4MDg5NDA5ZS02NWI4LTExZTgtYWVkMy1lYjg2ZTYxZjAyMjg6WEJqeXNha3BzYXl2QTZVeTVyNktOeW1kNGVhdklxcWVmaWFQ'
    }
  }).then(function (data) {
    let prodotti = data.result
    console.log(prodotti)

    prodotti.forEach(function (beer) {
      let beerCard = $(beerCardTpl(beer)).appendTo(container);
      beerCard.find(".btn").click(function (event) { //seleziono il bottone al click
        let suggestion = $(this).data("suggestion"); // ricavo il "data-suggestion" dalla selezione
        if (suggestion == null) {
          console.error("suggestion not found")
        } else {
          let suggestionLowercase = suggestion.toLowerCase() // tolgo le maiuscole dalla stringa
          suggetsionNoDot = suggestionLowercase.replace(/[^\w\s]|_/g, "") //rimuovo la punteggiatura
          let splitQuery = suggetsionNoDot.split(" "), // divido la frase in singole parole
            sw = stopwords.en
          filteredString = splitQuery.filter(function (parola) { //filtro mantenendo le parole non presenti nel file stopwords
            if (sw.includes(parola)) {
              return false
            } else {
              return true
            }
          });

          let lastWords = filteredString.slice(-2, filteredString.length) //riduco il numero di parole prendendo le ultime due
          console.log(lastWords)

          //seconda chiamata per le ricette

          let apiKey = "aa14fbbd2e93d8dee453a8bc3f5fee12"
          apiID = "69e8573d"
          url2 = "https://api.edamam.com/search?q=" + lastWords.join(" ") + "&app_id=" + apiID + "&app_key=" + apiKey
          console.log(url2)

          $.getJSON({
            url: url2
          }).then(function (recipes) {
            console.log(recipes)
          })
        }
      })
    })
  })
});
