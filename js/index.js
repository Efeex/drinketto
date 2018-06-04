$.getJSON({
    url: 'https://lcboapi.com/products?per_page=50',
    headers: {
      'Authorization': 'Token MDo4MDg5NDA5ZS02NWI4LTExZTgtYWVkMy1lYjg2ZTYxZjAyMjg6WEJqeXNha3BzYXl2QTZVeTVyNktOeW1kNGVhdklxcWVmaWFQ'
    }
  }).then(function (data) {
    let prodotti = data.result,
        pagine = data.pager
      
      console.log(data)
      console.log(prodotti)
  
    prodotti.forEach(function (item, i, array) {
  
      console.log(item.primary_category)
    })
  });