$.get( "api/users", function( data ) {
  console.log(data)
  data.forEach(element => {
    $("#users-online").append(
      `<div class="card text-left col-2 mr-2 mb-2">
        <div class="card-body">
          <h4 class="card-title">${element["email"]}</h4>
          <p class="card-text">
            Ultima vez visto em: ${element["last_seen:"]} <br>
            MAC: ${element["mac"]}
          </p>
        </div>
      </div>`
    )
  });   
});