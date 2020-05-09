export function sessionUser (req, res) {
  if(req.isAuthenticated()){
    console.log("Session usando",req.session);
    res.json({user: req.session.passport.user})
        
  }  
}