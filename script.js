const  btncart=document.querySelector('#cart-icon');
const  cart=document.querySelector('.cart');
const  btnclose=document.querySelector('#cart-close');


btncart.addEventListener('click',()=>{ // classlist .add is used to show the cart-active properties
    cart.classList.add('cart-active'); // used to show the side bar 
});

btnclose.addEventListener('click',()=>{ //classlist .remove is used to  remove  the cart-active properties
    cart.classList.remove('cart-active'); // used to remove the side bar
});

 document.addEventListener('DOMContentLoaded',loadfood);


 function loadfood(){
    loadcontent();
 }

 function  loadcontent(){
    let btnremove=document.querySelectorAll('.cart-remove'); // used to remove the  cart elements
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeitem);
    })

 
let qtyinpu=document.querySelectorAll('.cart-quantity');
qtyinpu.forEach((inp)=>{
    inp.addEventListener('change',changeqty);

});

 
 let cartbtn=document.querySelectorAll('.add-cart');
    cartbtn.forEach((btn)=>{
        btn.addEventListener('click',addcart);
        totalprice();
    });

 }

function removeitem(){
    if(confirm('Are you conform to remove')
    ){
let title1=this.parentElement.querySelector('.cart-food-tit').innerHTML;//used for to remove title in the array
console.log(title1);
itemlist=itemlist.filter(el=>el.title!=title1);// used to remove and then add item 
    this.parentElement.remove();

    totalprice(); // when i delete the cart the total price will recalulate 
    updatecartcount(); 
   

    }
 }
 // change the quantity statrting to 1
 function changeqty(){  
    if(isNaN(this.value)|| this.value<1){
        this.value=1;
    }
    loadcontent();
    
}
 let itemlist=[];
// get the titile,price,and imag 
  function addcart(){
     let food=this.parentElement;
    let title= food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imag=food.querySelector('.food-img').src; //geeting the image 
    let titl={title,price,imag};
    if(itemlist.find((tit)=>   // checking the product is already add or not
    tit.title==titl.title))
    {
        alert("product already in cart");
       
        return ;
        
    }
    else{
        itemlist.push(titl); 
        
    }


    
    let newproduct= createcart(title,price,imag);
    let element=document.createElement('div');   // create div for add the  product in cart
    element.innerHTML=newproduct;
    let cartbox=document.querySelector('.cart-content');
    cartbox.append(element);
    loadcontent();  // call the event
    
    updatecartcount();
    
  }

  // add item to cart shown in cart 
  function  createcart(title,price,imag){

    return `<div class="cart-box">
                        <img src="${imag}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-food-tit">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>

                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <ion-icon name="trash" class="cart-remove"></ion-icon>
                    </div>`;
  

  }


 

 function totalprice(){

  let p=document.querySelectorAll('.cart-box');
  let cost=document.querySelector('.total-price');
let tot=0;
  p.forEach(item=>{
    let pricecart=item.querySelector('.cart-price');
    
    let finalprice=parseFloat(pricecart.innerHTML.replace("Rs."," ").trim());
    let qty=item.querySelector('.cart-quantity').value; // quantity input type is number we use value
    
    tot+=(finalprice*qty);
    item.querySelector('.cart-amt').innerText="Rs."+(finalprice*qty); // for an individual qunatity
     
});
  
  
  cost.innerHTML="Rs."+tot;  // for total rs

  
 }
 // adding carticon count
  function updatecartcount(){
 const cartno=document.querySelector('.cart-count');
 var count=itemlist.length;
 
 console.log(count);

  
 cartno.innerHTML=count;

 if(count==0){

    cartno.style.display='none';
 }
 else{
    cartno.style.display='block';
 }
}


 

  
