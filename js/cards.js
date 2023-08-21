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
  return `  <div class="wrap card_wrapper animate pop">
    <div class="overlay">
      <div class="overlay-content animate slide-left delay-2">
        <h1 class="animate country_name slide-left pop delay-4">${name.common}</h1>
        <p
          class="animate capital slide-left pop delay-5"
          style="color: white; margin-bottom: 2.5rem"
        >
          <span>Capital:</span> <em>${capital}</em>
        </p>
        <p
          class="animate capital slide-left pop delay-5"
          style="color: white; margin-bottom: 2.5rem"
        >
          <span>Population:</span> <em>${population}</em>
        </p>
        <p
          class="animate capital slide-left pop delay-5"
          style="color: black; margin-bottom: 2.5rem"
        >
          <span>Region:</span> <em>${region}</em>
        </p>
      </div>
      <div
        class="image-content animate slide delay-5"
        style="
          background-image: url('${flags.svg}');
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          transition: 0.3s ease-in-out;
          background-repeat: no-repeat;
          background-position: start;

        "
      ></div>
    </div>
  </div>`;
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

