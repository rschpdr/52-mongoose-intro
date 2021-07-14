const mongoose = require("mongoose");

// Importando o Modelo que foi criado previamente
const CatModel = require("./models/Cat.model");

const cats = require("./data");

// String de conexão com o banco, a última parte da URI é o nome do banco de dados que vai ser conectado
mongoose
  .connect("mongodb://localhost:27017/cats", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  // Esperando a conexão com o banco
  .then((db) => {
    console.log(db.connections[0].name);

    return db.connection.dropDatabase();
  })
  // Esperando a deleção do banco para limpeza
  .then(async () => {
    // Criando um novo registro de gato na coleção usando o modelo pré-definido
    const result = await CatModel.create({
      name: "    Edi  ",
      age: 2,
      favoriteToys: ["paper ball", "cardboard box"],
      sex: "male",
    });

    console.log(result);

    // Inserindo vários registros de uma vez a partir de uma array
    const manyCatsResult = await CatModel.insertMany(cats);

    console.log(manyCatsResult);

    // Consultar todos os registros
    const allCats = await CatModel.find();

    console.log("ALL CATS => ", allCats);

    // Filtrar os resultados de uma busca
    const blackAndWhiteCats = await CatModel.find(
      { color: "black and white" },
      { name: 1, color: 1, _id: 0 } // projection
    ).sort({ name: 1 });

    console.log("FILTERED CATS => ", blackAndWhiteCats);

    // Atualizar um registro
    const updatedCat = await CatModel.findOneAndUpdate(
      { _id: result._id }, // Atualizando o gato criado na linha 25
      { $set: { age: 4 } },
      { new: true } // Essa configuração é necessária para receber o objeto atualizado ao invés do objeto original
    );

    console.log("UPDATED CAT =>", updatedCat);

    // Deletar um registro
    const deletedCat = await CatModel.deleteOne({
      _id: manyCatsResult[4]._id, // Deletando o gato Manguito que é o último índice da array
    });

    console.log("DELETED CAT => ", deletedCat);
  })
  .catch((err) => console.log("Erro de conexão no banco", err));
