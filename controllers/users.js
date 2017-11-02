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
  const gig = req.currentUser.gigs.id(req.params.id);
  gig.remove();

  return req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  update: usersUpdate,
  show: usersShow,
  gigsCreate: usersGigsCreate,
  gigsDelete: userGigsDelete
};
