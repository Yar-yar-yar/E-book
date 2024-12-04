'use strict';

//!-----------------------------------------------------------------------------------------
//! for both html pages

//? nav
const nav=document.querySelector('.nav');

const handleOver=function(value,target){
  const link=target;
  const siblings=link.closest('.nav').querySelectorAll('.nav__link');
  const title=link.closest('.nav').querySelector('.nav_title');
  
  
  if(!target.classList.contains('nav__link')) return;


  siblings.forEach(s=>{
      if(s!==link) s.style.opacity=value;
      title.style.opacity=value;
    });
}

//---------------------------------

nav.addEventListener('mouseover',function(e){
  handleOver(0.5,e.target);
})

nav.addEventListener('mouseout',function(e){
  handleOver(1,e.target);
})

//!-----------------------------------------------------------------------------------------
//! home js

function home(){


//? slide topic

const slides= document.querySelectorAll('.slide');

const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');

const slider=document.querySelector('.slider');
const dotContainer=document.querySelector('.dots');


const creatDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

creatDots();

const activeDots=function(slide){
document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));
document.querySelector(`.dots__dot[data-slide="${slide}"]`)
.classList.add(`dots__dot--active`);
};


const goToSlide=function(slide){
slides.forEach((s,i)=>s.style.transform=`translateX(${(slide-i) * 100}%)`);
activeDots(slide);
}
goToSlide(2);

let curSlide=0;
const maxSlide=slides.length;



const prevSlide=function(){
  if(curSlide==maxSlide-1) curSlide=0;
  else curSlide++;
  goToSlide(curSlide);

}

const nextSlide=function(){
  if(curSlide==0)curSlide=maxSlide-1;
  else curSlide--;
  goToSlide(curSlide);
}

btnRight.addEventListener('click',nextSlide)

btnLeft.addEventListener('click',prevSlide)


//? right and left key
document.addEventListener('keydown',function(e){

  if(e.key==='ArrowLeft') prevSlide();
  else if(e.key==='ArrowRight') nextSlide();

});

}


//!-----------------------------------------------------------------------------------------
//! books js 

function books(){
  
    
  //? hide and show books

  const table=document.querySelector('.table');
  const showInfoButton=document.querySelectorAll('.table__infoButton');
  
  table.addEventListener('click',function(e){
    const clickedButton=e.target.closest('.table__infoButton');
    
  //? change the color of the button
    if(!clickedButton)return;
    let clickedInfo= document.querySelector(`.table__infoRow--${clickedButton.dataset.tab}`);
     clickedInfo.classList.toggle('hidden');

    if(clickedInfo.classList.contains('hidden')){
       clickedButton.style.background='#f3f3f3';
       
    }
     else{
       clickedButton.style.background='#999';        
     }

  })
   
  //? choose button

  let selectedBooks=[];
  let totalPrice=0;

  
const chooseButton = document.querySelectorAll(".table__chooseButton");
table.addEventListener("click", function (e) {
  const clickedButton = e.target.closest(".table__chooseButton");
  if (!clickedButton) return;

  if (clickedButton.classList.contains("active_button")) {
    totalPrice=totalPrice-Number(clickedButton.closest("tr").querySelector("td:nth-child(3)").innerText);
    

    clickedButton.classList.remove("active_button");

    selectedBooks = [...selectedBooks].filter((book) => {
      // return book.id === clickedButton.closest("tr").id;
      return book.id !== clickedButton.closest("tr").id;

    });

  } else {
    totalPrice=totalPrice+Number(clickedButton.closest("tr").querySelector("td:nth-child(3)").innerText);
    selectedBooks.push({
      id: clickedButton.closest("tr").id,
      // place
      الكاتب: clickedButton.closest("tr").querySelector("td:nth-child(1)").innerText,
      // رمز الكتاب (ISBN)
      ISBN: clickedButton.closest("tr").querySelector("td:nth-child(2)").innerText,
      // price
      السعر: +clickedButton.closest("tr").querySelector("td:nth-child(3)")
        .innerText,
    });

    clickedButton.classList.add("active_button");
  }


});
   
  
 
  




//? form 


function send() {
console.log(selectedBooks);
const email = document.getElementById("email").value;
const nationalNumber = document.getElementById("national-number").value;
const phoneNumber = document.getElementById("phone-number").value;
const captchaInput = document.getElementById("captcha-input").value;
const username = document.getElementById("username").value;
const usernamePattern = /^[\u0600-\u06FF\s]+$/;

if (/^(0[1-9]|1[0-5])[0-9]{9}$/.test(nationalNumber) &&username===""&&email===""&&captchaInput===""&&phoneNumber==="") {
  alert(`${JSON.stringify(selectedBooks)}
  المجموع الكلي :${totalPrice}`);
  return true;


} else {
  if (!usernamePattern.test(username)) {
    alert("الرجاء إدخال الاسم باللغة العربية بدون أرقام أو رموز");
    return false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("يرجى إدخال عنوان بريد إلكتروني صالح");
    return false;
  }

  let numberPattern = /^(0[1-9]|1[0-5])[0-9]{9}$/;
  if (!numberPattern.test(nationalNumber)) {
    alert("يرجى إدخال رقم وطني صالح بين 01 و 15");
    return false;
  }

  let phonePattern =
    /((0)(93|94|95|96|98|99)([0-9]{7}))|((0)(92|95|96|97)([0-9]{7}))/;
  if (!phonePattern.test(phoneNumber)) {
    alert("يرجى إدخال رقم هاتف صالح مع رمز (مثال: 0992034996)");
    return false;
  }

  if (captchaInput === "") {
    alert("يرجى إدخال رمز التحقق من الكابتشا");
    return false;
  }

  if (captcha !== captchaInput) {
    alert("رمز التحقق من الكابتشا غير صحيح");
    return false;
  }

  alert(`${JSON.stringify(selectedBooks)}
  المجموع الكلي :${totalPrice}`);
  return true;
}
}

//?-------------------




//?captcha
let captcha, chars;

const refreshbtn=document.getElementById('refreshbtn');
const checkbtn2=document.getElementById('checkbtn-2');

function genNewCaptcha(){
  
  chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  captcha = chars[Math.floor(Math.random() * chars.length )];
  for(let i=0; i<6; i++){
    captcha = captcha + chars[Math.floor(Math.random() * chars.length )];
  }
  
  form1.text.value = captcha;
}
  
refreshbtn.addEventListener('click',function(){
  genNewCaptcha();
})
checkbtn2.addEventListener('click',function(){
  send();
  genNewCaptcha();
})

//? scroll
const checkbtn1=document.getElementById('checkbtn-1');
checkbtn1.addEventListener('click',function(){
const section_form=document.querySelector('.section_form')
checkbtn1.addEventListener('click',function(e){

  if(!selectedBooks.length==0){

    const s1coords=section_form.getBoundingClientRect();
    section_form.classList.remove('hidden');
    section_form.scrollIntoView({behavior:"smooth"})
  }
  else{
    alert('اختر كتاب');
  }
  
})
});

}



