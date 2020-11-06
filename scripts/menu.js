    //GLOBAL
//MENU
const menuactive = document.querySelector('.menu');
const menu = document.querySelector('.burguermenu');

menuactive.addEventListener('click', function() {
  dark.classList.add("dark--active");
  menu.classList.add("burguermenu--move");
  //console.log();
});

dark.addEventListener('click', function(){
    if(dark.classList.contains("dark--active") && menu.classList.contains("burguermenu--move")){ 
      dark.classList.remove("dark--active"); 
      menu.classList.remove("burguermenu--move")
    }
    
});