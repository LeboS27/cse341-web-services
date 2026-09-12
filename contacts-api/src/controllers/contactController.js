// Controllers hold the route logic.
// In plain words, a controller is the middle person:
// - it receives the request from a route,
// - it asks the data store to read or change MongoDB,
// - it sends the right response back to the user.

const CONTACT_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

// The W01/W02 rubric checks for these exact contact fields. This helper keeps
// saved contacts in that simple shape even if a request sends extra data.
function buildContactFromBody(body) {
  return CONTACT_FIELDS.reduce((contact, field) => {
    contact[field] = body[field];
    return contact;
  }, {});
}

async function getAllContacts(req, res, next) {
  try {
    // W01 requirement: return every contact from the collection.
    const contacts = await req.app.locals.store.findAll();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    // W01 requirement: use the id in the URL to find one MongoDB document.
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
    // W02 requirement: add a new contact and update the database.
    const createdContact = await req.app.locals.store.create(buildContactFromBody(req.body));

    // Status 201 means "created". Returning the new id makes the route easy to
    // test in Swagger and in the video walkthrough.
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
    // W02 requirement: update the contact whose id appears in the route.
    const matchedCount = await req.app.locals.store.update(req.params.id, buildContactFromBody(req.body));

    if (matchedCount === 0) {
      return res.status(404).json({
        error: 'Contact not found',
        message: `No contact exists with id ${req.params.id}.`,
      });
    }

    // Status 204 means the update worked and there is no response body.
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    // W02 requirement: delete the contact whose id appears in the route.
    const deletedCount = await req.app.locals.store.remove(req.params.id);

    if (deletedCount === 0) {
      return res.status(404).json({
        error: 'Contact not found',
        message: `No contact exists with id ${req.params.id}.`,
      });
    }

    // Status 204 means the delete worked and there is no response body.
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
