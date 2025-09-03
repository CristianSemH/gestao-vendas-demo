
const { cliente } = require("../models")
const treatment = require('./errorReturn');
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await cliente.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            inativo: false,
            [Op.or]: [
                {
                    nome: {
                        [Op.iLike]: '%' + filter + '%'
                    }
                },
                {
                    cpf: {
                        [Op.iLike]: '%' + filter + '%'
                    }
                },
                {
                    cnpj: {
                        [Op.iLike]: '%' + filter + '%'
                    }
                },
                {
                    celular: {
                        [Op.iLike]: '%' + filter + '%'
                    }
                }
            ]
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
    await cliente.create(req.body).then(Cliente => {
        res.status(201).send(Cliente);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await cliente.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(Cliente => {
        res.status(200).send(Cliente);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {
    const { nome, TipoPessoa, cpf, cnpj, celular } = req.body;
    const id = parseInt(req.params.id);
    await cliente.update({
        nome,
        TipoPessoa,
        cpf,
        cnpj,
        celular
    }, {
        returning: true,
        where: {
            id
        }
    }).then(([rowsUpdate, [Cliente]]) => {
        res.status(200).send(Cliente);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await cliente.update({
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