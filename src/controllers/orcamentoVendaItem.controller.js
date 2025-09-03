
const { orcamentoVendaItem } = require("../models")
const totalize = require("../models/totalize.models")

exports.listAll = async (req, res) => {
    await orcamentoVendaItem.findAll({
        where: {
            inativo: false
        }
    }).then(OrcamentoVendaItems => {
        res.status(200).send(OrcamentoVendaItems);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.create = async (req, res) => {
    await orcamentoVendaItem.create(req.body).then(OrcamentoVendaItem => {
        res.status(201).send(OrcamentoVendaItem);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await orcamentoVendaItem.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(OrcamentoVendaItem => {
        res.status(200).send(OrcamentoVendaItem);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.update = async (req, res) => {
    const { idProduto,
        descricaoProduto,
        quantidade,
        valor,
        idOrcamentoVenda } = req.body;
    const id = parseInt(req.params.id);
    await orcamentoVendaItem.update({
        idProduto,
        descricaoProduto,
        quantidade,
        valor,
        idOrcamentoVenda
    }, {
        returning: true,
        where: {
            id
        }
    }).then(([rowsUpdate, [OrcamentoVendaItem]]) => {
        totalize.totalizeOrcamentoVenda(idOrcamentoVenda)
        res.status(200).send(OrcamentoVendaItem);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await orcamentoVendaItem.update({
        inativo: true
    }, {
        where: {
            id
        }
    }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(err);
    })
};