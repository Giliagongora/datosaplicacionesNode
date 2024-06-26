const express = require("express");
const bodyParser = require("body-parser");
const { 
  agregarUsuario, 
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  transferencias,
  transferencia
 } = require("./config/queries");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Crear una ruta GET raíz que devuelva el documento index.html. 
app.get("/", (req, res) => {
  // res para enviar el archivo index.html al cliente -__dirname es una variable global en Node.js que contiene la ruta del directorio en el que se encuentra el script actual.
  res.sendFile(__dirname + "/index.html");
});

//  crea un usuario
app.post("/usuario", async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const resultado = await agregarUsuario(nombre, balance);
    // console.log("Valor devuelto por la funcion de base de datos: ", resultado);
    res.status(200).json(resultado);
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

// obtener usuarios registrados
app.get("/usuarios", async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const resultado = await obtenerUsuarios(nombre, balance);
    res.status(200).json(resultado);
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/usuario', async (req, res) => {
  try {
    const { id } = req.query;
    const resultado = await eliminarUsuario(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put('/usuario', async (req,res) => {
try{
  const { id } = req.query;
  const { name, balance } = req.body;
  const resultado = await actualizarUsuario(id, name, balance);
  res.status(200).json(resultado);
  res.send(resultado)
}catch (error) {
  console.log("error", error, error.message);
  res.status(500).json({ error: error.message });
}
// console.log(actualizarUsuario(2, "Samanta", 4000)); //
})


app.post("/transferencia", async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;
    console.log("emisor, receptor, monto: ", emisor, receptor, monto)
    // res.status(200).json(resultado);
    // res.send(resultado)
    // return resultado;
    const resultado = await transferencia(emisor, receptor, monto);
    console.log("transferencias: ", resultado);
    res.json(resultado)

  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
}); 


app.get("/transferencias", async (req, res) => {
  try {
    const data = await transferencias();
    // console.log('Resultado : ', data);
    // res.status(200).json(resultado);
    res.status(200).send(data)
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});



