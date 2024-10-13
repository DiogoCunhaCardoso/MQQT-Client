import net from "net";

const PORT: number = 5000;
const HOST: string = "localhost";

const tcpServer = net.createServer((socket) => {
  console.log("A client just connected");

  // triggered when a client sends data
  socket.on("data", (clientData) => {
    socket.write(`Client sent ${clientData}`);
  });
});

tcpServer.listen(PORT, HOST, () => console.log(`Connected on port ${PORT}`));

/* 

TEST WITH A CLIENT 

*/

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);

  console.log("Type a message to send to the server (type 'exit' to close):");

  // Capture user input
  process.stdin.on("data", (input) => {
    const message = input.toString().trim();

    if (message.toLowerCase() === "exit") {
      console.log("Exiting...");
      client.end(); // Close the client socket connection
      process.exit(); // Terminate the process
    }

    // Send the message to the server
    client.write(message);
  });
});

// When data is received
client.on("data", (data) => {
  console.log(`Received from server: ${data.toString()}`);
});

// When connection close
client.on("close", () => {
  console.log("Connection closed");
});
