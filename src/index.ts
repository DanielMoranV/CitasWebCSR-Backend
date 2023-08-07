import app from "./app";

async function main() {
  try {
    //Iniciando el servidor, escuchando...
    app.listen(app.get("port"), () => {
      console.log(`Server init at http://localhost:${app.get("port")} `);
    });
  } catch (error) {
    console.log("Unable to connect to the database");
  }
}

main();
