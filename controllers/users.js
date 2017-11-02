const User = require('../models/user');

function usersUpdate(req, res, next) {
  Object.assign(req.currentUser, req.body);

  return req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

function usersShow(req, res) {
  res.json(req.currentUser);
}

function usersGigsCreate(req, res, next) {
  req.currentUser.gigs.push(req.body);
  return req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}
function userGigsDelete(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      return artist.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  update: usersUpdate,
  show: usersShow,
  gigsCreate: usersGigsCreate,
  gigsDelete: userGigsDelete
};
