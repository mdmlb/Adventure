
//CHARACT
const charact = document.querySelector('.charact');
const charactText1 = document.querySelector('.charact__textOne');
const charactText2 = document.querySelector('.charact__textTwo');
const charactText3 = document.querySelector('.charact__textThree');
const charactDot1 = document.querySelector('.charact__dotOne');
const charactDot2 = document.querySelector('.charact__dotTwo');
const charactDot3 = document.querySelector('.charact__dotThree');

charactDot1.addEventListener('click', function(){
    const img1 = './Resources/dotInnactive.png';
    const img2 = './Resources/dotActive.png';

    const currentImg = charactDot1.getAttribute('src');

    if(currentImg == img1) {
        charactDot1.setAttribute('src', img2);
    } else {
        charactDot1.setAttribute('src', img1);
    }

    charactText1.classList.toggle("textopacity");
});




charactDot2.addEventListener('click', function(){
    const img1 = './Resources/dotInnactive.png';
    const img2 = './Resources/dotActive.png';

    const currentImg = charactDot2.getAttribute('src');

    if(currentImg == img1) {
        charactDot2.setAttribute('src', img2);
    } else {
        charactDot2.setAttribute('src', img1);
    }

    charactText2.classList.toggle("textopacity");

    console.log("Boton 2");
});

charactDot3.addEventListener('click', function(){
    const img1 = './Resources/dotInnactive.png';
    const img2 = './Resources/dotActive.png';

    const currentImg = charactDot3.getAttribute('src');

    if(currentImg == img1) {
        charactDot3.setAttribute('src', img2);
    } else {
        charactDot3.setAttribute('src', img1);
    }

    charactText3.classList.toggle("textopacity");
    console.log("Boton 3");
});



//GALLERY
const carrousel = document.querySelector('.carrousel');
const carrouselStripe = document.querySelector('.carrousel__stripe');
const carrouselSlider = document.querySelector('.carrousel__slider');
carrouselSlider.setAttribute('max', carrouselStripe.children.length - 1);
carrouselSlider.addEventListener('input', function() {
  const width = carrousel.clientWidth;
  const value = carrouselSlider.value;
  carrouselStripe.style.transform = 'translate(-' + (width * value) + 'px, 0px)';
});

//MENU
const menuactive = document.querySelector('.menu');
const menu = document.querySelector('.burguermenu');
const dark = document.querySelector('.dark');

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

//SPECS
const specs = document.querySelector('.specsBox');
const modal = document.querySelector('.modal');

specs.addEventListener('click', function() {
  dark.classList.add("dark--active");
  modal.classList.add("modal--move");
  console.log(modal.classList.add("modal--move"));
});

dark.addEventListener('click', function(){
    if(dark.classList.contains("dark--active") && modal.classList.contains("modal--move")){ 
      dark.classList.remove("dark--active"); 
      modal.classList.remove("modal--move")
    }
    
});