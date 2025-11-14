import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment';

const OrcamentoVendasPDF = async (OrcamentoVendas) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const dataAbertura  = moment(OrcamentoVendas.dataAbertura).format('DD/MM/YYYY');

    const reportTitle = [
        {
            columns: [
                {
                    width: '*',
                    text: {
                        text: 'ORÇAMENTO',
                        fontSize: 30,
                        bold: true,
                        style: 'textColor'
                    },
                    margin: [30, 30, 0, 30]
                },
                /*{
                    image: base64.logo,
                    width: 110,
                    alignment: 'right',
                    margin: [0, 15, 30, 0]
                }*/

            ]
        }, {
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        {
                            text: [
                                {
                                    text: 'Cliente\n', bold: true, fontSize: 14,
                                    style: 'textColor'
                                },
                                {
                                    text: OrcamentoVendas.Cliente.nome,
                                    style: 'textColor'
                                }
                            ],
                            colSpan: 4,
                            style: 'tableTop'
                        },
                        {},
                        {},
                        {},
                    ],
                    [
                        {
                            text: [
                                {
                                    text: 'Contato\n', bold: true, fontSize: 14,
                                    style: 'textColor'
                                },
                                {
                                    text: OrcamentoVendas.Cliente.celular,
                                    style: 'textColor'
                                }
                            ],
                            style: 'tableTop'
                        },
                        {
                            text: [
                                {
                                    text: 'Nº orçamento\n', bold: true, fontSize: 14,
                                    style: 'textColor'
                                },
                                {
                                    text: OrcamentoVendas.id,
                                    style: 'textColor'
                                }
                            ],
                            style: 'tableTop'
                        },
                        {
                            text: [
                                {
                                    text: 'Data abertura\n', bold: true, fontSize: 14,
                                    style: 'textColor'
                                },
                                {
                                    text: dataAbertura,
                                    style: 'textColor'
                                }
                            ],
                            style: 'tableTop'
                        },
                        {
                            text: [
                                {
                                    text: 'Forma pagamento\n', bold: true, fontSize: 14,
                                    style: 'textColor'
                                },
                                {
                                    text: OrcamentoVendas.FormaPagamento.descricao,
                                    style: 'textColor'
                                }
                            ],
                            style: 'tableTop'
                        }
                    ]

                ]
            },
            layout: 'noBorders',
            margin: [30, 0, 30, 30]
        }
    ];

    const dadosItens = OrcamentoVendas.OrcamentoVendaItems.map((itens) => {
        return [
            { text: itens.id, style: 'tableItem' },
            { text: itens.descricaoProduto, style: 'tableItem' },
            { text: parseFloat(itens.quantidade).toFixed(2).toString().replace('.', ','), style: 'tableItem' },
            { text: 'R$ ' + parseFloat(itens.valor).toFixed(2).toString().replace('.', ','), style: 'tableItem' },
            { text: 'R$ ' + parseFloat(parseFloat(itens.valor) * parseFloat(itens.quantidade)).toFixed(2).toString().replace('.', ','), style: 'tableItem' }
        ]
    })

    const details = [
       
        {
            table: {
                widths: ['*', '*', '*', '*', '*'],
                headerRows: 1,
                border: [false, false, false, false],
                body: [
                    [
                        { text: 'Item', style: 'tableHeaderItem' },
                        { text: 'Descrição', style: 'tableHeaderItem' },
                        { text: 'Quantidade', style: 'tableHeaderItem' },
                        { text: 'Valor unitário', style: 'tableHeaderItem' },
                        { text: 'Total', style: 'tableHeaderItem' }
                    ],
                    ...dadosItens
                ]
            },
            layout: 'lightHorizontalLines',
            margin: [0, 0, 0, 20]
        },
        {
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    table: {
                        widths: [120, 120],
                        body: [
                            [
                                {
                                    text: 'FRETE',
                                    style: 'tableHeaderTotal'
                                },
                                {
                                    text: 'R$ ' + parseFloat(OrcamentoVendas.frete).toFixed(2).toString().replace('.', ','),
                                    style: 'tableDadosTotal'
                                }
                            ],
                            [
                                {
                                    text: 'DESCONTO',
                                    style: 'tableHeaderTotal'
                                },
                                {
                                    text: 'R$ ' + parseFloat(OrcamentoVendas.desconto).toFixed(2).toString().replace('.', ','),
                                    style: 'tableDadosTotal'
                                }
                            ],
                            [
                                {
                                    text: 'SUB TOTAL',
                                    style: 'tableHeaderTotal'
                                },
                                {
                                    text: 'R$ ' + parseFloat(OrcamentoVendas.subTotal).toFixed(2).toString().replace('.', ','),
                                    style: 'tableDadosTotal'
                                }
                            ],
                            [
                                {
                                    text: 'TOTAL',
                                    style: 'tableHeaderTotal',
                                    color: '#f7f4f4',
                                    fillColor: '#1f263a',
                                },
                                {
                                    text: 'R$ ' + parseFloat(OrcamentoVendas.valorTotal).toFixed(2).toString().replace('.', ','),
                                    style: 'tableDadosTotal',
                                    color: '#f7f4f4',
                                    fillColor: '#1f263a',
                                },
                            ]
                        ]
                    },
                    layout: 'lightHorizontalLines'
                }
            ],
        }
    ];

    const Rodape = [
        {
            columns: [

                [
                    /*{
                        image: base64.footer,
                        width: 280,
                        alignment: 'center'
                    }*/
                ]

            ]
        }
    ]

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15, 230, 15, 100],

        header: [reportTitle],
        content: [details],
        styles: {
            textColor: {
                color: '#1f263a',
            },
            tableTop: {
                fontSize: 13,
                margin: [0, 0, 0, 10]
            },
            tableHeaderItem: {
                fontSize: 13,
                fillColor: '#1f263a',
                color: '#f7f4f4',
                alignment: 'center',
                margin: [0, 5, 0, 5]
            },
            tableItem: {
                fontSize: 13,
                color: '#1f263a',
                alignment: 'center',
                margin: [0, 5, 0, 5]
            },
            tableHeaderTotal: {
                fontSize: 15,
                color: '#1f263a',
                alignment: 'left',
                margin: [20, 5, 0, 5]
            },
            tableDadosTotal: {
                fontSize: 15,
                color: '#1f263a',
                alignment: 'right',
                margin: [0, 5, 20, 5]
            }

        },
        footer: Rodape,
    }

    pdfMake.createPdf(docDefinitios).open();
}

export default OrcamentoVendasPDF;

