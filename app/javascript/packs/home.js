var strftime = require('strftime')

$.get( "api/users", function( data ) {
  console.log(data)
  users = {}
  data.forEach(element => {
    if(element["email"] in users) {
      users[element["email"]]["mac"].push(element["mac"])
      if(users[element["email"]]["last_seen"].getTime() < Date(element["last_seen"])) {
        users[element["email"]]["last_seen"] = new Date(element["last_seen"])
      }
    } else {
      users[element["email"]] = { "mac": [element["mac"]], "last_seen": new Date(element["last_seen"]) }
    }
  });

  for (var key in users) {
    $("#users-online").append(
      `<div class="card text-left col-2 mr-2 mb-2">
        <div class="card-body">
          <h4 class="card-title">${key.split("auth.")[1].split("-")[0]}</h4>
          <p class="card-text">
            Ultima vez visto em: ${strftime('%d/%m %Hh%Mm', users[key]["last_seen"])} <br>
            Número de Dispositivos: ${users[key]["mac"].length}
          </p>
        </div>
      </div>`
    )
  }   
});