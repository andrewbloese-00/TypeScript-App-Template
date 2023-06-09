import './style.css'

//templates
import Landing from './templates/Landing'
import Login, { LoginInit } from './templates/Login'
import Register from './templates/Register'
import Forgot from './templates/Forgot'

//listeners
import LoginListeners from './listeners/LoginListeners'
import RegisterListeners from './listeners/RegisterListeners'
import LandingListeners from './listeners/LandingListeners'
import ForgotListeners from './listeners/ForgotListeners'

//blaze-lib
import { toaster } from './lib/Toaster'
import { BlazeRenderer } from './lib/render'
import state from './lib/state'
import { auth  } from './lib/firebase-client'

//shorthand for local storage access
const ls = window.localStorage

//reference to navbar to allow dynamic changes to links in nav
const navbar = document.querySelector("#navigation")!

//*OPTIONAL - sets containing protected and nonuser specific routes
const PROTECTED = new Set(["dashboard","create"])
const NONUSER_ONLY = new Set(["register","login","forgot"])


//! FIREBASE AUTH CONNECTION 
//register auth to save to local storage
//also link state manager to track logged in or not
auth.onAuthStateChanged((user)=>{
  console.log(user)

  if(user){//handle has user
    const k = window.location.hash.split("#").pop() || ""
    const stored = {
      name: user.displayName || "N / A",
      email: user.email || "N / A",
      uid: user.uid,
    }
    state.set("loggedIn", true)
    state.set("userData",stored)
    ls.setItem("user", JSON.stringify(stored))
    navbar!.innerHTML = `
    <a href="#dashboard">Dashboard</a>
    `
    if(NONUSER_ONLY.has(k)){
      toaster.add("info",`Must be non user to access ${window.location.hash}`)
      window.location.hash = "#"
    }
    //end handle has user
  } else { //handle no user

    //check if current route is protected, if so the return user to login
    if(PROTECTED.has(window.location.hash.split("#").pop()!)){
      toaster.add("info",`Must be signed in to access ${window.location.hash}`)
      window.location.hash = "#login"
    }
    //additionally update the navigation to the logged out version
    navbar!.innerHTML = `
    <a href="#login">Login</a>
    <a href="#register">Register</a>
`

    //update state / storage
    state.purge("userData")
    state.set("loggedIn",false)
    ls.removeItem("user")
  }
})

//declare app 
function App(){
  //initialize app
  const app = new BlazeRenderer("#app")
  
  //define routes
  app.addRoute("",Landing,LandingListeners )
  app.addRoute("login",Login,LoginListeners,LoginInit)
  app.addRoute("register",Register,RegisterListeners)
  app.addRoute("forgot",Forgot,ForgotListeners)
  
  //start must be called after all routes have been declared
  app.start()
}


//initialize app on page load
window.addEventListener("DOMContentLoaded",()=>{ 
  App()
})





