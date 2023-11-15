import { app, server } from "./app";

async function main() {
  try {
    // Iniciar el servidor HTTP (Express)
    server.listen(app.get("port"), () => {
      console.log(`Server init at http://localhost:${app.get("port")} `);
    });
  } catch (error) {
    console.log("Unable to connect to the database");
  }
}

main();
