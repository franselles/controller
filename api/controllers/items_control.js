'use strict';

const Items = require('../models/items_model');

function getItemsCitySector(req, res) {
  const cityID = req.query.cityID;
  const beachID = req.query.beachID;
  const sectorID = req.query.sectorID;
  Items.find({
    cityID: cityID,
    beachID: beachID,
    sectorID: sectorID,
  })
    .sort({ col: 1, row: 1 })
    .exec((err, doc) => {
      if (err)
        return res.status(500).send({
          message: `Error al realizar la petición: ${err}`,
        });
      if (!doc)
        return res.status(404).send({
          message: 'No existe',
        });

      res.status(200).send(doc);
    });
}

function getItem(req, res) {
  const cityID = req.query.cityID;
  const sectorID = req.query.sectorID;
  const typeID = req.query.typeID;
  const col = req.query.col;
  const row = req.query.row;
  Items.find({
    cityID: cityID,
    sectorID: sectorID,
    typeID: typeID,
    col: col,
    row: row,
  }).exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`,
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe',
      });

    res.status(200).send(doc);
  });
}

function postItems(req, res) {
  // const data = new Sectors();

  // data.cityID = req.body.cityID;
  // data.city = req.body.city;
  // data.beachID = req.body.beachID;
  // data.beach = req.body.beach;
  // data.sectorID = req.body.sectorID;
  // data.sector = req.body.sector;
  // data.description = req.body.description;
  // data.positionX = req.body.positionX;
  // data.positionY = req.body.positionY;
  // data.image1 = req.body.image1;
  // data.image2 = req.body.image2;
  // data.cols = req.body.cols;
  // data.rows = req.body.rows;
  // data.blocked = req.body.blocked;

  // data.save((err, docStored) => {
  //   if (err)
  //     res.status(500).send({
  //       message: `Error al salvar en la base de datos: ${err} `,
  //     });

  //   res.status(200).send(docStored._id);
  // });

  Items.insertMany(req.body, function (err, docStored) {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `,
      });

    res.status(200).send({ message: 'OK', docStored: docStored._id });
  });
}

function putItem(req, res) {
  const id = req.query.id;
  const update = req.body;

  Items.findByIdAndUpdate(id, update).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `,
      });

    res.status(200).send(docStored);
  });
}

function putItems(req, res) {
  const updatedSectors = req.body;

  updatedSectors.forEach(async element => {
    await Items.findByIdAndUpdate(element._id, element).exec();
  });
  res.status(200).send({ updated: 'ok' });
}

module.exports = {
  getItemsCitySector,
  getItem,
  postItems,
  putItem,
  putItems,
};
