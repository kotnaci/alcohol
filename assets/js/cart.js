cartBody = document.getElementById('cart-body');

cart = document.getElementById('cart');

async function siso() {
  let storage = Object.keys(localStorage);

    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';

    let path = 'http://localhost:8080/cart?';

    let summ = 0;

    for (let key of storage) {
        console.dir(`${key}: ${localStorage.getItem(key)}`);
        
        path = 'http://localhost:8080/cart?';
        path = path + `id=${key}`;

        await fetch(path, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' }
              })
                  .then(response => response.json())
                  .then(commit => {
                      let summItm = 0;
                      const row = document.createElement('div');
                      const row1 = document.createElement('div');
                      const row2 = document.createElement('div');
                      const row3 = document.createElement('div');
                      const collg1 = document.createElement('div');
                      const collg2 = document.createElement('div');
                      const collg3 = document.createElement('div');
                      const rc1 = document.createElement('div');
                      const rc2 = document.createElement('div');
                      const rc3 = document.createElement('div');
                      const img = document.createElement('img');
                      const title = document.createElement('h6');
                      const price = document.createElement('span');
                      const line = document.createElement('hr');
                      const count = document.createElement('h6');
                      const sumItm = document.createElement('h6');
                      const close = document.createElement('i');
                      const closebtn = document.createElement('button');
                      
                      close.classList.add("fas");
                      close.classList.add("fa-times")
                      closebtn.appendChild(close);
      
                     
      
                      closebtn.onclick = (e) =>{
                          localStorage.removeItem(key);
                          siso();  
                      }
                      
      
                      closebtn.classList.add('btn');
                      closebtn.classList.add('btn-danger');
                      closebtn.classList.add('buttoncenter');
      
                      collg1.classList.add('col1');
                      collg2.classList.add('col2');
                      rc1.classList.add('row2');
                      rc2.classList.add('row1');
                      line.classList.add('lineafter');
                      row.classList.add('row');
                      count.appendChild(document.createTextNode(`${localStorage.getItem(key)} шт`));
                      img.style.width = "100px"
                      img.src = commit.urlImg;
                      title.appendChild(document.createTextNode(commit.title));
                      price.appendChild(document.createTextNode(`${commit.price} руб`));
                      summItm += Number(commit.price * Number(localStorage.getItem(key)));
                      sumItm.appendChild(document.createTextNode(`${summItm} руб`));
      
                      rc1.appendChild(title);
                      rc2.appendChild(count);
                      rc3.appendChild(sumItm);
                      row2.appendChild(price);
      
                      row.appendChild(collg1);
                      row.appendChild(collg2);
                      row.appendChild(collg3);
                      collg1.appendChild(img);
                      collg2.appendChild(row1);
                      collg2.appendChild(row2);
                      collg3.appendChild(closebtn);
                      row1.appendChild(rc1);
                      row1.appendChild(rc2);
                      row1.appendChild(rc3);
                      row2.appendChild(closebtn);
                      cartBody.appendChild(row);
                      cartBody.appendChild(line); 
                      
                      summ += Number(summItm);
                      console.dir(summ);
                  }).catch(err => console.log(err));

          }

          
          path = 'http://localhost:8080/cart?';
          
          console.dir(summ);
          const accept = document.createElement('a');
          const line1 = document.createElement('hr');
          const line2 = document.createElement('hr');
          const sum = document.createElement('h5');
    

        accept.classList.add('btn');
        accept.classList.add('btn-danger');
        accept.classList.add('buttoncenter');
          accept.appendChild(document.createTextNode('Оформить заказ'));
          accept.href="/order"

          sum.appendChild(document.createTextNode(`Сумма заказа: ${summ} руб`));
          cartBody.appendChild(line1);
          cartBody.appendChild(sum);
          cartBody.appendChild(line2);
          cartBody.appendChild(accept);
          cartBody.style.display = "block";
}

document.addEventListener("click", () => {
 document.getElementById('cart-body').style.display = "none";
})


document.getElementById("sendItems").addEventListener("click", siso);

async function del (id){
    localStorage.removeItem(id);
    sendItems();
}


function onload()
{
    
}
