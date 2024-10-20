let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
});

let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform.rotate(${i * 6.3}deg")>${char}</b>`
).join("");

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button,index) => {
    button.addEventListener('click',() => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

var mixer = mixiup('portfolio-gallery',{
    selectors:{
        target:'portfolio-box'
    },
    animation:{
        duration:500
    }
});

var swiper = new Swiper(".mySwiper",{
    slidesPerView: 1,
    spaceBetween: 30,
    pagination:{
        el:".swiper-pagination",
        clickable: true,
    },
    autoplay:{
        delay:3000,
        disableOnlnteraction:false,
    },


    breakpoints:{
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
     
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        },
    }
});


const first_skill = document.querySelector(".skill:first-child");















    











