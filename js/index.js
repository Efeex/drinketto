//console.log(stopwords.en)
//prima chiamata per le bevande
$.getJSON({
  url: 'https://lcboapi.com/products?per_page=50',
  headers: {
    'Authorization': 'Token MDo4MDg5NDA5ZS02NWI4LTExZTgtYWVkMy1lYjg2ZTYxZjAyMjg6WEJqeXNha3BzYXl2QTZVeTVyNktOeW1kNGVhdklxcWVmaWFQ'
  }
}).then(function (data) {
  let prodotti = data.result

  for(let i=0; i < 5; i++){
    let item = prodotti[i]
    let suggestion = item.serving_suggestion,
      categoria = item.primary_category
      console.log(suggestion)

    if (suggestion == null) {
      console.error("suggestion not found")
    } else {
      let suggestionLowercase = suggestion.toLowerCase() // tolgo le maiuscole dalla stringa
          suggetsionNoDot = suggestionLowercase.replace(/[^\w\s]|_/g, "") //rimuovo la punteggiatura
      let splitQuery = suggetsionNoDot.split(" "), // divido la frase in singole parole
          sw = stopwords.en
          filteredString = splitQuery.filter(function(parola){ //filtro mantenendo le parole non presenti nel file stopwords
            if (sw.includes(parola)){ 
              return false
             } else {
               return true
             }
          })
          let lastWords = filteredString.slice(-4, filteredString.length)
        
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
  }
});