//seleziono ed inizializzio il container per il template di Handlebars
$(function () {
  var beerCardTpl = Handlebars.compile($("#beer-card").html()),
      recipeCardTpl = Handlebars.compile($("#recipe-card").html()),
      homeTpl = Handlebars.compile($("#homepage").html()),
      container = $("#drink-container")

      
      $(homeTpl()).appendTo($(".homepage-container"));

  $('.navbar-brand').click(function(e){    
    $(".homepage-container").empty()
    $("#drink-container").empty()
    $(homeTpl()).appendTo($(".homepage-container")); // torno alla homepage
  })
  

  $('#navbarSupportedContent .nav-link').click(function (e) {
    $(".homepage-container").empty()
    $("#drink-container").empty()
    getData($(this).text()) //prendo il valore dal testo dei link nella navbar per la ricerca
  })

  $('.formQuery').submit (function submitQuery(event) { //funzione per la ricerca libera
    let userQuery = event.target[0].value //ricavo il valore dalle parole immesse dall'utente
    $(".homepage-container").empty()
    $("#drink-container").empty()
    getData(userQuery)
    event.preventDefault()
})

// funzione per ricavare i dati
  function getData(q) { 
    $.getJSON({ // prima chiamata per le bevande
      url: 'https://lcboapi.com/products?q=' + q,
      headers: {
        'Authorization': 'Token MDo4MDg5NDA5ZS02NWI4LTExZTgtYWVkMy1lYjg2ZTYxZjAyMjg6WEJqeXNha3BzYXl2QTZVeTVyNktOeW1kNGVhdklxcWVmaWFQ'
      }
    }).then(function (data) {

      console.log(data)

      let prodotti = data.result

      prodotti.forEach(function (beer) { //per ogni birra trovata 
      
        let beerCard = $(beerCardTpl(beer)).appendTo(container); //crea una card "appesa" al conteiner (Handlebars)        
        $(".popoverSuggestion").hover().popover('enable');
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

            //seconda chiamata per le ricette

            let apiKey = "aa14fbbd2e93d8dee453a8bc3f5fee12"
            apiID = "69e8573d"
            url2 = "https://api.edamam.com/search?q=" + lastWords.join(" ") + "&app_id=" + apiID + "&app_key=" + apiKey // creo l'url riunendo le ultime parole con il metodo join
            
            $.getJSON({
              url: url2
            }).then(function (recipes) {

                let ricette = recipes.hits[0].recipe,
                    container = $('#modal-container'),
                    recipeCard = container.html(recipeCardTpl(ricette)),
                    suggestiOnRecipe = $('.recipeSuggestion').append("This is our suggestion for your drink: " + suggestion)
                    ingredienti = ricette.ingredients
                   
                $('#recipe-modal').modal().on('hidden.bs.modal', function (e) {
                  $(this).modal('dispose')
                }) 
                $('.btn-danger').click(function () {
                  $("#recipe-modal").modal('hide')
                }) 
            })
          }
        })
      })
        $(".card").mouseover(function(){
          $(this).addClass("hvr-glow")
         })
         $(".card").mouseout(function(){
           $(this).removeClass("hvr-glow")
          })
          $(".popoverSuggestion").click(function(){
            $(this).addClass("hvr-icon-pop")
           })
    })
  }
});



