let cardRow = document.querySelector( ".card__row" );

function getData( url ) {
  class ErrorResponse extends Error {
    constructor( status, message ) {
      super( message );
      this.status = status;
    }
  }

  return new Promise( ( resolve, reject ) => {
    fetch( url )
      .then( ( res ) => {
        if ( res.ok ) {
          return res.json();
        } else {
          reject( new ErrorResponse( res.status, "Url is error" ) );
        }
      } )
      .then( ( res ) => {
        resolve( res );
      } );
  } );
}

function getCard( {
  name,
  flags,
  population,
  capital,
  region,
} ) {
  return ` <div class="col-4">
            <div class="head">
              <img src="${flags}" alt="">
            </div>
            <div class="body">
              <h4>${name}</h4>
              <div class="about-c">
                <p>Population: <span>${population}</span> </p>
                <p>Region: <span>${region}</span> </p>
                <p>Capital: <span>${capital}</span></p>
              </div>
            </div>
          </div>`
}


let choosenRegion = document.querySelector( ".all-region" );

function pagination() {
  var items = $( ".card__row .wrap" );
  var numItems = items.length;
  var perPage = 10;

  items.slice( perPage ).hide();

  $( "#pagination-container" ).pagination( {
    items: numItems,
    itemsOnPage: perPage,
    prevText: "&laquo;",
    nextText: "&raquo;",
    onPageClick: function ( pageNumber ) {
      var showFrom = perPage * ( pageNumber - 1 );
      var showTo = showFrom + perPage;
      items.hide().slice( showFrom, showTo ).show();
    },
  } );
}
async function getCountries( url ) {
  let countries = await getData( url );
  cardRow.innerHTML = "";
  countries.map( ( country ) => {
    cardRow.innerHTML += getCard( country );
  } )

  pagination();
}

getCountries( "https://restcountries.com/v3.1/all" );

document.getElementById( "input" ).addEventListener( "keyup", function ( event ) {
  let searchQuery = event.target.value.trim();
  getCountries( `https://restcountries.com/v3.1/name/${searchQuery}` );

} );

function changeRegion( region ) {
  choosenRegion.textContent = `${region}`;
  if ( region === "All" ) {
    getCountries( "https://restcountries.com/v3.1/all" );
  } else {
    getCountries( `https://restcountries.com/v3.1/region/${region}` );
  }
}

