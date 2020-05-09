export const isAuthenticated = (req, res, next) => {    
  if (req.isAuthenticated()) {        
    return next();
  }
  res.status(401).json({message: 'Unauthorized, log in to get started'})  
};

/* Retornar datos de la session */

