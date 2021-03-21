/// OPTIONAL: If using Sequelize validation features
const { ValidationError } = require('sequelize');

const LOG = require('../util/logger');

const db = require('../models/index')();

// OPTIONAL: VALIDATION Helper function ----------------------

/**
 * Prepare an item from the request information and add
 * an 'error' attribute to share with the view.
 *
 * @param {*} err - the error
 * @param {*} req - the request
 * @returns - the item to attach to response.locals
 */
async function prepareInvalidItem(err, req) {
  LOG.error('ERROR SAVING ITEM');
  LOG.error('Captured validation error: ', err.errors[0].message);
  const item = {};
  if (req.body.id) {
    item.id = req.body.id;
  }
  item.name = req.body.name;
//   item.lifeSpan = req.body.lifeSpan;
//   item.isPet = req.body.isPet;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Place_location.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET one JSON by ID
module.exports.findOne = async (req, res) => {
  const { id } = req.params;
  (await db).models.Place_location.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// HANDLE EXECUTE DATA MODIFICATION REQUESTS -----------------------------------

// POST /save
module.exports.saveNew = async (req, res) => {
  try {
    const context = await db;
    await context.models.Place_location.create(req.body);
    return res.redirect('/place_location');
  } catch (error) {
    if (error instanceof ValidationError) {
      const item = await prepareInvalidItem(error, req);
      res.locals.place_location = item;
      return res.render('place_location/create.ejs', { title: 'Place_locations', res });
    }
    return res.redirect('/place_location');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Place_location.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/place_location');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.place_location = item;
      return res.render('place_location/edit.ejs', { title: 'Place_locations', res });
    }
    return res.redirect('/place_location');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Place_location.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/place_location');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Place_location.findAll()
    .then((data) => {
      res.locals.place_locations = data;
      res.render('place_location/index.ejs', { title: 'Locations', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp animal and add it to the response.locals object
  // this will provide a animal object to put any validation errors
  const tempItem = {
    name: 'Place_locationName',
    // lifeSpan: 1,
    // isPet: true,
  };
  res.locals.place_location = tempItem;
  res.render('place_location/create.ejs', { title: 'Place_locations', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Place_location.findByPk(id)
    .then((data) => {
      res.locals.place_location = data;
      if (data) {
        res.render('place_location/delete.ejs', { title: 'Place_locations', res });
      } else {
        res.redirect('place_location/');
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /details/:id
module.exports.showDetails = async (req, res) => {
  const { id } = req.params;
  (await db).models.Place_location.findByPk(id)
    .then((data) => {
      res.locals.place_location = data;
      res.render('place_location/details.ejs', { title: 'Place_locations', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /edit/:id
module.exports.showEdit = async (req, res) => {
  const { id } = req.params;
  (await db).models.Place_location.findByPk(id)
    .then((data) => {
      res.locals.place_location = data;
      res.render('place_location/edit.ejs', { title: 'Place_locations', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};