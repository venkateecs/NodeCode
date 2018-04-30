let config = require('../Config/config');
let userCtrl = require('../controllers/userController');
const getUsers = {
    method: 'GET',
    path: '/users',
    config: {
      handler: async (request) => {
        return userCtrl.getUsers().then((res) => {
            return res;
          });
      }
    }
  };
  const getTodos = {
     method:'GET',
     path:'/todos',
     config: {
       handler: async (request) => {
          return userCtrl.getTodos().then((res)=> {
              return res ;
           })  
       }
     }
  }
const getUsertodos = {
  method:'GET',
  path:'/userTodo',
  config: {
    handler: async(request)=> {
         return userCtrl.getUserTodos().then((res)=> {
           return res ;
         })
    }
  }
}
const getUsersTestcount = {
  method:'GET',
  path:'/usersCount',
  handler: async(req)=> {
     return userCtrl.getUsersCount()
     .then((res)=> {
          return res ;
     }) 
  }
}

const saveUsers = {
  method:'POST',
  path:'/saveUsers',
  config: {
    handler:async(req)=> {
      return userCtrl.saveUsersTest(req.payload)
      .then((res)=> {
         return res ;
      })
    }
  }
}

const updateUsers = {
  method:'POST',
  path:'/updateUsers',
  config: {
    handler: async(req)=> {
       return userCtrl.updateUsersTest(req.payload)
       .then((res)=> {
          return res ;
       }) 
    }
  }
}
const saveCountries = {
   method:'POST',
   path:'/saveCountry',
   config: {
     handler:async(req)=>{
      return userCtrl.saveCountry(req.payload)
      .then((res)=> {
        return res ;
      })
     }
   }
}
const saveStates = {
  method:'POST',
  path:'/saveStates',
  handler:(async(req)=> {
    return userCtrl.saveStates(req.payload)
    .then((res)=> {
      return res ;
    })
  })
}
const getCountries = {
  method:'GET',
  path:'/countries',
  handler:(async(req)=> {
     return userCtrl.getCountriesStates()
     .then((res)=> {
       return res;
     })
  })
}
const saveCities = {
 method:'POST',
 path:'/saveCities',
 handler:( async(req)=> {
    return userCtrl.saveCities(req.payload)
    .then((res)=> {
      return res ;
    })
 }) 
}
const getStates = {
 method:'GET',
 path:'/getCities',
 handler:(async(req)=> {
  return userCtrl.getCities()
  .then((res)=> {
   return res ;
  })
 }) 
}
  module.exports=[getUsers , getTodos, getUsertodos,getUsersTestcount,saveUsers,updateUsers,saveCountries,saveStates,getCountries,saveCities,getStates];