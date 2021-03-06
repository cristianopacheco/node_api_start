const PaginationService = require('../services/pagination');

class DepartmentsController {
  constructor(Department) {
    this.Model = Department;
    this.limit = 1;
  }

  async getAll(req, res) {
    const currentPage = req.params.page;
    const total = await this.Model.count();
    const paginationService = new PaginationService(total, this.limit, currentPage);
    const pagination = paginationService.paginate();

    return this.Model
      .find({})
      .skip(pagination.skip)
      .limit(this.limit)
      .then((data) => {
        const result = {
          data,
          meta: pagination.meta,
        };
        res.send(result);
      })
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    return this.Model
      .find({ _id: req.params.id })
      .then(data => res.send(data))
      .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    const department = new this.Model(req.body);
    return department
      .save()
      .then(data => res.status(201).send(data))
      .catch(err => res.status(400).send(err.message));
  }

  update(req, res) {
    return this.Model
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(data => res.send(data))
      .catch(err => res.status(400).send(err.message));
  }

  destroy(req, res) {
    return this.Model
      .remove({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  }
}

module.exports = DepartmentsController;
