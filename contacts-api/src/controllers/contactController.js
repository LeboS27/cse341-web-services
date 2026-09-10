// Controllers hold the route logic.
// They receive the request, ask the data store to do the database work,
// and then send a response back to the client.

async function getAllContacts(req, res, next) {
  try {
    const contacts = await req.app.locals.store.findAll();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const contact = await req.app.locals.store.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: `No contact exists with id ${req.params.id}.`,
      });
    }

    return res.json(contact);
  } catch (error) {
    return next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const createdContact = await req.app.locals.store.create(req.body);
    res.status(201).json({
      message: 'Contact created successfully.',
      id: createdContact._id,
      contact: createdContact,
    });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const matchedCount = await req.app.locals.store.update(req.params.id, req.body);

    if (matchedCount === 0) {
      return res.status(404).json({
        error: 'Contact not found',
        message: `No contact exists with id ${req.params.id}.`,
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const deletedCount = await req.app.locals.store.remove(req.params.id);

    if (deletedCount === 0) {
      return res.status(404).json({
        error: 'Contact not found',
        message: `No contact exists with id ${req.params.id}.`,
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
