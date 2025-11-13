
const { tipoGasto } = require("../models")
const treatment = require('./errorReturn')
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await tipoGasto.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            inativo: false,
            descricao: {
                [Op.like]: '%' + filter + '%'
            }
        },
        offset,
        ...(limit > 0 && { limit })
    }).then(({ count, rows }) => {
        res.status(200).send({ rows, count });
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.create = async (req, res) => {
    await tipoGasto.create(req.body).then(TipoGasto => {
        res.status(201).send(TipoGasto);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await tipoGasto.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(TipoGasto => {
        res.status(200).send(TipoGasto);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {
    const { descricao, corHexaDecimalFundo, corHexaDecimalFonte } = req.body;
    const id = parseInt(req.params.id);
    await tipoGasto.update({
        descricao,
        corHexaDecimalFonte,
        corHexaDecimalFundo
    }, {
        returning: true,
        where: {
            id
        }
    }).then(([rowsUpdate, [TipoGasto]]) => {
        res.status(200).send(TipoGasto);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await tipoGasto.update({
        inativo: true
    }, {
        where: {
            id
        }
    }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};