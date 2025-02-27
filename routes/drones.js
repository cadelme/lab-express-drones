const express = require('express');
const router = express.Router();

// require the Drone model here

// requerir el modelo
const Drone = require('./../models/Drone.model')

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone
    .find()
    .then(drones => res.render('drones/list', { drones }))
    
});

router.get('/drones/crear', (req, res) => {
    res.render("drones/create-form")
});

router.post('/drones/crear', (req, res) => {
  
  const { name, propellers, maxSpeed } = req.body

  Drone
    .create({ name, propellers, maxSpeed })
    .then(drone => res.redirect("/drones"))
    .catch(err => console.log(err))
});


router.get('/drones/:id/edit', (req, res) => {
  // Iteration #4: Update the drone
    const { id } = req.params

    Drone
      .findById(id)
      .then(drone => res.render("drones/update-form", drone))
      .catch(err => console.log(err))

});

router.post('/drones/:id/edit', (req, res) => {
  // Iteration #4: Update the drone

    const { id } = req.params
    const { name, propellers, maxSpeed } = req.body

    Drone
      .findByIdAndUpdate(id, { name, propellers, maxSpeed })
      .then(drone => res.redirect('/drones'))
      .catch(err => console.log(err))
  })


router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params

  Drone
    .findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch(err => console.log(err))
});

module.exports = router;


