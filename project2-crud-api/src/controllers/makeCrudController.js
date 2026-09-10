// This factory creates a controller for one collection.
// We use it for both books and authors because the CRUD pattern is the same.
function makeCrudController({ storeName, itemName }) {
  function getStore(req) {
    return req.app.locals.store[storeName];
  }

  return {
    async getAll(req, res, next) {
      try {
        const items = await getStore(req).findAll();
        res.json(items);
      } catch (error) {
        next(error);
      }
    },

    async getById(req, res, next) {
      try {
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
        const item = await getStore(req).create(req.body);
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
        const matchedCount = await getStore(req).update(req.params.id, req.body);
        if (matchedCount === 0) {
          return res.status(404).json({
            error: `${itemName} not found`,
            message: `No ${itemName.toLowerCase()} exists with id ${req.params.id}.`,
          });
        }
        return res.status(204).send();
      } catch (error) {
        return next(error);
      }
    },

    async remove(req, res, next) {
      try {
        const deletedCount = await getStore(req).remove(req.params.id);
        if (deletedCount === 0) {
          return res.status(404).json({
            error: `${itemName} not found`,
            message: `No ${itemName.toLowerCase()} exists with id ${req.params.id}.`,
          });
        }
        return res.status(204).send();
      } catch (error) {
        return next(error);
      }
    },
  };
}

module.exports = { makeCrudController };
