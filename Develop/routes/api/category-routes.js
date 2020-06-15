const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', (req, res) => {
  // find all categories
  Category.findAll({ include: Product }).then(dbCategory => {
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({ include: Product, where: {id: req.params.id }}).then(dbCategory => {
    res.json(dbCategory)
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => {
    res.json(newCategory);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(updated => {
    res.json(updated + ` category updated`);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}}).then(deleted => {
    res.json(deleted + ` category destroyed`);
  })
});

module.exports = router;
