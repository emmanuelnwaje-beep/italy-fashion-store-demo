const products = [
  {id:1,name:"The Court Sneaker",category:"Shoes",price:89,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",tag:"BESTSELLER",desc:"A clean everyday sneaker with a considered silhouette."},
  {id:2,name:"Leather Weekend Trainer",category:"Shoes",price:115,image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85",tag:"NEW",desc:"Relaxed lines and versatile everyday comfort."},
  {id:3,name:"Minimal Runner",category:"Shoes",price:99,image:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85",tag:"",desc:"Sport-inspired form, made for everyday wear."},
  {id:4,name:"City Leather Loafer",category:"Shoes",price:139,image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85",tag:"",desc:"An understated classic for a more polished look."},
  {id:5,name:"Essential Heavyweight Tee",category:"Clothing",price:39,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",tag:"EVERYDAY",desc:"A soft, easy-fitting staple for your rotation."},
  {id:6,name:"Relaxed Overshirt",category:"Clothing",price:79,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",tag:"NEW",desc:"An easy layer with a clean, modern finish."},
  {id:7,name:"Studio Sweatshirt",category:"Clothing",price:69,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",tag:"",desc:"A relaxed essential for off-duty days."},
  {id:8,name:"Tailored Everyday Jacket",category:"Clothing",price:149,image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",tag:"",desc:"A refined layer designed to work across seasons."},
  {id:9,name:"Forma Steel Watch",category:"Watches",price:129,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",tag:"SIGNATURE",desc:"A minimal timepiece with a quietly confident profile."},
  {id:10,name:"Classic Leather Watch",category:"Watches",price:159,image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",tag:"",desc:"A timeless dial paired with a refined strap."},
  {id:11,name:"Everyday Crossbody",category:"Accessories",price:74,image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",tag:"",desc:"A compact companion for days on the move."},
  {id:12,name:"Essential Sunglasses",category:"Accessories",price:49,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",tag:"",desc:"A versatile finishing touch with a clean shape."}
];

let activeFilter = "All";
let cart = JSON.parse(localStorage.getItem("atelierCart") || "[]");
const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR"}).format(value);

function renderProducts(){
  const query = ($("#searchInput").value || "").trim().toLowerCase();
  let list = products.filter(p => (activeFilter === "All" || p.category === activeFilter) && (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)));
  const sort = $("#sortSelect").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  if(sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
  $("#resultsCount").textContent = `${list.length} ${list.length===1?"PIECE":"PIECES"}`;
  $("#productGrid").innerHTML = list.length ? list.map(p=>`
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.tag?`<span class="product-tag">${p.tag}</span>`:""}
        <button class="quick-add" data-add="${p.id}">ADD TO BAG&nbsp; +</button>
      </div>
      <div class="product-meta"><div><p class="product-name">${p.name}</p><p class="product-category">${p.category.toUpperCase()}</p></div><span class="product-price">${money(p.price)}</span></div>
    </article>`).join("") : `<p class="empty-bag">No pieces found. Try another search.</p>`;
}
function saveCart(){localStorage.setItem("atelierCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(i=>i.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your bag");}
function renderCart(){
  const count=cart.reduce((sum,i)=>sum+i.qty,0);
  const subtotal=cart.reduce((sum,i)=>sum+products.find(p=>p.id===i.id).price*i.qty,0);
  $("#bagCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#subtotal").textContent=money(subtotal);
  $("#checkoutButton").disabled=count===0;
  $("#cartItems").innerHTML=count?cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="quantity"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}">REMOVE</button></div>`}).join(""):`<div class="empty-bag">Your bag is waiting.<br><a href="#shop" id="continueShopping">Discover the collection ↗</a></div>`;
}
function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200);}
function openCart(){ $("#overlay").classList.add("visible");$("#cartDrawer").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){ $("#overlay").classList.remove("visible");$("#cartDrawer").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");}
function openCheckout(){if(!cart.length)return;closeCart();$("#checkoutModal").classList.add("open");$("#checkoutModal").setAttribute("aria-hidden","false");}
function closeCheckout(){ $("#checkoutModal").classList.remove("open");$("#checkoutModal").setAttribute("aria-hidden","true");}

document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));return;}
  const qty=e.target.closest("[data-qty]");if(qty){const id=Number(qty.dataset.qty),item=cart.find(i=>i.id===id);item.qty+=Number(qty.dataset.change);if(item.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart();return;}
  const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(i=>i.id!==Number(remove.dataset.remove));saveCart();return;}
  if(e.target.closest("#continueShopping"))closeCart();
  const nav=e.target.closest("[data-nav]");if(nav){activeFilter=nav.dataset.nav==="all"?"All":nav.dataset.nav;document.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();$("#mainNav").classList.remove("open");}
});
document.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;document.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();}));
$("#sortSelect").addEventListener("change",renderProducts);
$("#searchToggle").addEventListener("click",()=>{$("#searchBar").classList.toggle("open");if($("#searchBar").classList.contains("open"))$("#searchInput").focus();});
$("#closeSearch").addEventListener("click",()=>{$("#searchBar").classList.remove("open");$("#searchInput").value="";renderProducts();});
$("#searchInput").addEventListener("input",renderProducts);
$("#bagButton").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
$("#checkoutButton").addEventListener("click",openCheckout);$("#closeCheckout").addEventListener("click",closeCheckout);
$("#checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")closeCheckout();});
$("#mobileMenuBtn").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="Thank you — this demo form is not connected to a mailing list.";e.target.reset();});
$("#checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  const number=(STORE_CONFIG.whatsappNumber||"").replace(/\D/g,"");
  if(!number || number.includes("XXXXXXXXX")){alert("Demo setup: open config.js and add the shop owner's WhatsApp number before testing order enquiries.");return;}
  const data=new FormData(e.target);
  const lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `• ${p.name} x ${i.qty} — ${money(p.price*i.qty)}`;}).join("\n");
  const total=cart.reduce((sum,i)=>sum+products.find(p=>p.id===i.id).price*i.qty,0);
  const message=`Hello ${STORE_CONFIG.storeName}, I would like to enquire about this order:\n\n${lines}\n\nSubtotal: ${money(total)}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nDelivery location: ${data.get("location")}\nNote: ${data.get("note")||"None"}\n\nPlease confirm availability, delivery cost and payment options.`;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank");
  closeCheckout();showToast("Your WhatsApp order enquiry is ready.");
});
renderProducts();renderCart();
