let workers=JSON.parse(localStorage.getItem("fixbudget_workers")||"[]");
const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(){
 const q=$("search").value.toLowerCase(), cat=$("category").value;
 const list=workers.filter(w=>(!cat||w.work===cat)&&[w.name,w.phone,w.city,w.work,w.desc].join(" ").toLowerCase().includes(q));
 $("cards").innerHTML=list.length?list.map(w=>`<article class="worker">
 <span class="badge">${esc(w.work)}</span><h3>${esc(w.name)}</h3>
 <p>📍 ${esc(w.city)}</p><p>${esc(w.desc||"პროფესიონალი ხელოსანი")}</p>
 <a class="phone" href="tel:${esc(w.phone)}">📞 ${esc(w.phone)}</a>
 </article>`).join(""):`<div class="worker empty"><h3>ხელოსანი ვერ მოიძებნა</h3><p class="muted">შეცვალე ძიება ან დაამატე ახალი ხელოსანი.</p></div>`;
}
function addWorker(){
 const w={name:$("name").value.trim(),phone:$("phone").value.trim(),city:$("city").value.trim(),work:$("work").value||"სხვა",desc:$("desc").value.trim()};
 if(!w.name||!w.phone||!w.city){alert("სახელი, ტელეფონი და ქალაქი აუცილებელია.");return}
 workers.unshift(w);localStorage.setItem("fixbudget_workers",JSON.stringify(workers));
 ["name","phone","city","desc"].forEach(id=>$(id).value="");$("work").value="";render();
}
$("search").addEventListener("input",render);$("category").addEventListener("change",render);render();
