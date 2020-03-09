var strftime = require('strftime')
Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

window.setInterval(draw,30000)
draw()
function draw() {
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

    var n_users = Object.keys(users).length
    var n_devices = data.length
    var n_online = 0

    $("#users-online").html("")
    for (var key in users) {
      ttl = ((Date.now() - users[key]["last_seen"].getTime())/1000) - 4*60*60
      card_type = "bg-secondary"
      console.log(ttl)
      if (ttl < 10*60) {
        n_online += 1
        card_type = "bg-success" 
      }
      
      $("#users-online").append(
        `
        <div class="col-2 px-1 py-1">
          <div class="card ${card_type} text-left" style="max-width: 22rem;">
            <div class="card-body">
              <h4 class="card-title">${key.split("auth.")[1].split("-")[0]}</h4>
              <p class="card-text">
                Data: ${strftime('%d/%m %Hh%Mm', users[key]["last_seen"].addHours(4))} <br>
                Nº Dispositivos: ${users[key]["mac"].length}
              </p>
            </div>
          </div>
        </div>
        `
      )
    }

    $("#header").html(
      `<h1>Quem está na Zygo: ${n_online}/${n_users} Usuários online </h1>`
    )
  });
}