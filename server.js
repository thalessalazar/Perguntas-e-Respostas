
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');

// database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados');
    })
    .catch((msgErro) => {
        console.log('Não foi possível conectar com o banco de dados');
    });

//Models
const perguntaModel = require('./models/Pergunta');

//config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

//rotas
app.get("/", (req, res) => {
    perguntaModel.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/perguntar');
    });

});

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    perguntaModel.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { //pergunta encontrada
            res.render('pergunta', {
                pergunta: pergunta
            });
        }
        else { // não encontrada
            res.redirect('/')
        }
    })
});

//inicia o servidor
app.listen(3000, (error) => {
    if (error) { console.log("Não foi possível iniciar o servidor") }
    else { console.log("Servidor Iniciado com sucesso!") }
});
