const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const Categories = await Category.findAll({
      include: [Product] 
    });
    res.status(200).json(Categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product] // Include associated Product data
    });
    if (!category) {
      res.status(404).json({ message: 'not found!' });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const Newcategory = await Category.create(req.body);
    res.status(200).json(Newcategory);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const Updatedcategory = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (Updatedcategory === 0) {
      res.status(400).json({ message: 'category not found' });
      return;
    }
    res.json({ message: ' updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const Deletedcategory = await Deletedcategory.destroy({
      where: { id: req.params.id }
    });
    if ( Deletedcategory === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: ' deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
