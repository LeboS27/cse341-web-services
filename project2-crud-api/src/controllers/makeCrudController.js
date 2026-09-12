// This factory creates a controller for one collection.
// We use it for both books and authors because the CRUD pattern is the same.
function makeCrudController({ storeName, itemName, allowedFields }) {
  // The app stores books and authors data stores in app.locals.
  // This helper picks the correct store for the current controller.
  function getStore(req) {
    return req.app.locals.store[storeName];
  }

  // Only save fields that belong to this collection.
  // This keeps random extra request data out of MongoDB.
  function buildItemFromBody(body) {
    return allowedFields.reduce((item, field) => {
      if (body[field] !== undefined && body[field] !== '') {
        item[field] = body[field];
      }
      return item;
    }, {});
  }

  return {
    async getAll(req, res, next) {
      try {
        // Read every item in this collection.
        const items = await getStore(req).findAll();
        res.json(items);
      } catch (error) {
        next(error);
      }
    },

    async getById(req, res, next) {
      try {
        // Read one item using the MongoDB ObjectId from the URL.
        const item = await getStore(req).findById(req.params.id);
        if (!item) {
          return res.status(404).json({
            error: `${itemName} not found`,
            message: `No ${itemName.toLowerCase()} exists with id ${req.params.id}.`,
          });
        }
        return res.json(item);
      } catch (error) {
        return next(error);
      }
    },

    async create(req, res, next) {
      try {
        // Create one new document after validation has already passed.
        const item = await getStore(req).create(buildItemFromBody(req.body));
        res.status(201).json({
          message: `${itemName} created successfully.`,
          id: item._id,
          [itemName.toLowerCase()]: item,
        });
      } catch (error) {
        next(error);
      }
    },

    async update(req, res, next) {
      try {
        // Replace one existing document. If no id matches, report 404.
        const matchedCount = await getStore(req).update(req.params.id, buildItemFromBody(req.body));
        if (matchedCount === 0) {
          return res.status(404).json({
            error: `${itemName} not found`,
            message: `No ${itemName.toLowerCase()} exists with id ${req.params.id}.`,
          });
        }

        // 204 means the update worked and there is no response body.
        return res.status(204).send();
      } catch (error) {
        return next(error);
      }
    },

    async remove(req, res, next) {
      try {
        // Delete one existing document. If no id matches, report 404.
        const deletedCount = await getStore(req).remove(req.params.id);
        if (deletedCount === 0) {
          return res.status(404).json({
            error: `${itemName} not found`,
            message: `No ${itemName.toLowerCase()} exists with id ${req.params.id}.`,
          });
        }

        // 204 means the delete worked and there is no response body.
        return res.status(204).send();
      } catch (error) {
        return next(error);
      }
    },
  };
}

module.exports = { makeCrudController };
