import express from 'express';
export const router = express.Router();
router.get('/',(req,res)=> {
  res.send('This is Routers');
});
router.get('/countries',(req,res)=> {
    res.send(['India','SriLanka','UK']);
  });
  router.get('/countries/:name',(req,res)=> {
    res.send(req.params.name);
  });
  router.post('/addCountries',(req,res)=> {      
    res.send(req.body);
  });
  router.post('/addCountries/:id',(req,res)=> {
      const obj = req.body ;
      obj.id = req.params.id ;
    res.send(obj);
  });
