let username = "test";
// the user's descriminator

let designation = "ove"
// learn about designaitions here: https://github.com/RoturTW/main/wiki/Rotur-Designations

let my_client = {
  "system": "OliveOS Web",
  "version": "0.1.0 DEVELOPER BUILD"
}
// client is sent with all packets to help tell servers and other clients what system you are using

let packets = {}
// connect to websocket server
function sendHandshake() {
  msg = {
    "cmd": "handshake",
    "val": {
      "language": "Javascript",
      "version": {
        "editorType": "rotur",
        "versionNumber": null
      }
    },
    "listener": "handshake_cfg"
  }

  ws.send(JSON.stringify(msg));
}

function setUsername(username) {
  msg = {
    "cmd": "setid",
    "val": username,
    "listener": "set_username_cfg"
  }

  ws.send(JSON.stringify(msg));
}

function linkRoom(room) {
  msg = {
    "cmd": "link",
    "val": room,
    "listener": "link_cfg"
  }

  ws.send(JSON.stringify(msg));
}

function replyToPacket(message, payload) {
  msg = {
    "cmd": "pmsg",
    "val": {
      "client": my_client,
      "target": message.source,
      "message": payload,
      "timestamp": Date.now()
    },
    "id": message.origin
  }

  ws.send(JSON.stringify(msg));
}

function sendMessage(payload, username, target, source) {
  msg = {
    "cmd": "pmsg",
    "val": {
      "client": my_client,
      "target": target,
      "payload": payload,
      "source": source,
      "timestamp": Date.now()
    },
    "id": username
  }

  ws.send(JSON.stringify(msg));
}

function login(username, password) {
  if (!this.is_connected) {
    return "Not Connected";
  }
  if (this.authenticated) {
    return "Already Logged In";
  }
  return new Promise((resolve, reject) => {
    this.ws.send(
      JSON.stringify({
        cmd: "pmsg",
        val: {
          ip: this.client.ip,
          client: this.my_client,
          command: "login",
          id: this.userToken,
          payload: [username, MD5("" + password)],
        },
        id: this.accounts,
      }),
    );

    const handleLoginResponse = (event) => {
      let packet = JSON.parse(event.data);
      if (packet?.origin?.username === this.accounts) {
        if (packet.val?.source_command === "login") {
          if (typeof packet.val?.payload === "object") {
            this.ws.close();
            this.userToken = packet.val.token;
            this.user = packet.val.payload;

            delete packet.val
            delete this.user.password;
            delete this.user.key;

            // friends data
            this.friends = {};
            // handle if the user has no friends :P
            if (!this.user["sys.friends"]) this.user["sys.friends"] = [];
            if (!this.user["sys.requests"]) this.user["sys.requests"] = [];

            this.friends.list = this.user["sys.friends"];
            this.friends.requests = this.user["sys.requests"];
            delete this.user.friends;
            delete this.user.requests;

            // setup username for reconnect
            this.username = username + "§" + randomString(10);
            this.connectToWebsocket();
            while (!this.is_connected) { }
            this.authenticated = true;
            resolve(`Logged in as ${username}`);
          } else {
            this.authenticated = false;
            reject(`Failed to login as ${username}`);
          }
          this.ws.removeEventListener("message", handleLoginResponse);
        }
      }
    };

    this.ws.addEventListener("message", handleLoginResponse);
  });
}

let ws = new WebSocket("wss://rotur.mistium.com");
let client = {}
// wait for connection
ws.onopen = function () {
  console.log("Connected!");

  sendHandshake();

  ws.onmessage = function (event) {
    packet = JSON.parse(event.data);
    if (packet.cmd == "client_ip") {
      client.ip = packet.val;
    } else if (packet.cmd == "client_obj") {
      client.username = packet.val.username;
    } else if (packet.cmd == "ulist") {
      if (packet.mode == "add") {
        client.users.push(packet.val);
      } else if (packet.mode == "remove") {
        client.users = client.users.filter(user => user != packet.val);
      } else if (packet.mode == "set") {
        client.users = packet.val;
      }
    }
    if (packet.cmd == "pmsg") {
      packet.origin = packet.origin.username;
      delete packet.rooms
      delete packet.cmd
      packet.client = packet.val.client
      packet.source = packet.val.source
      packet.payload = packet.val.payload
      if (!packets[packet.target]) {
        packets[packet.val.target] = []
      }
      packets[packet.val.target].push(packet);
      delete packet.val
    }
    if (packet.listener == "handshake_cfg") {
      setUsername(designation + "-" + username);
    }
    if (packet.listener == "set_username_cfg") {
      client.username = designation + "-" + username;
      linkRoom(["roturTW"]);
    }
    if (packet.listener == "link_cfg") {
      client.room = packet.val
    }
  }
}