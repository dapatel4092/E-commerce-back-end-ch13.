const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    
    const tagsData = await Tag.findAll({
     
      include: [{ model: Product, through: ProductTag }],
    });
    
    res.status(200).json(tagsData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    
    const tagData = await Tag.findByPk(req.params.id, {
     
      include: [{ model: Product, through: ProductTag }],
    });
  
    if (!tagData) {
      res.status(400).json({ message: 'No tag found!' });
      return;
    }
   
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post route for creating a new tag
router.post('/', async (req, res) => {
  try {
    
    const newTag = await Tag.create(req.body);
    
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put route for updating a tag
router.put('/:id', async (req, res) => {
  
  try {
    
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if (updatedTag[0]) {
      res.status(400).json({ message: 'No tag found ' });
      return;
    }
    
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete route for a tag by specific id
router.delete('/:id', async (req, res) => {
  try {
    
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!deletedTag) {
      res.status(400).json({ message: 'No tag found with this id!' });
      return;
    }
    
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;