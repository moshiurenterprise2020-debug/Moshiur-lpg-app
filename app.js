const $=id=>document.getElementById(id);
const KEY='moshiur_lpg_entries_v1';
let entries=JSON.parse(localStorage.getItem(KEY)||'[]');
const money=n=>'৳'+Number(n||0).toLocaleString('en-BD');
function render(){
 const sales=entries.filter(x=>x.type==='sale').reduce((a,x)=>a+x.total,0);
 const buys=entries.filter(x=>x.type==='purchase').reduce((a,x)=>a+x.total,0);
 const dues=entries.filter(x=>x.type==='collection').reduce((a,x)=>a+x.total,0);
 const expenses=entries.filter(x=>x.type==='expense').reduce((a,x)=>a+x.total,0);
 $('summary').innerHTML=`<p>বিক্রয়: <b>${money(sales)}</b></p><p>ক্রয়: <b>${money(buys)}</b></p><p>বাকি আদায়: <b>${money(dues)}</b></p><p>খরচ: <b>${money(expenses)}</b></p>`;
 $('list').innerHTML=entries.length?'<table><thead><tr><th>তারিখ</th><th>ধরন</th><th>বিবরণ</th><th>মোট</th></tr></thead><tbody>'+entries.slice().reverse().map(x=>`<tr><td>${x.date}</td><td>${x.typeBn}</td><td>${escapeHtml(x.note||x.brand+' '+x.size+' × '+x.qty)}</td><td>${money(x.total)}</td></tr>`).join('')+'</tbody></table>':'<p>এখনো কোনো হিসাব যোগ করা হয়নি।</p>';
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('save').onclick=()=>{let qty=Number($('qty').value),price=Number($('price').value);if(qty<1||price<0||!Number.isFinite(qty*price)){alert('পরিমাণ ও দাম ঠিকভাবে লিখুন');return;}let type=$('type').value;let names={sale:'বিক্রয়',purchase:'ক্রয়',collection:'বাকি আদায়',expense:'খরচ'};entries.push({date:new Date().toLocaleDateString('bn-BD'),type,typeBn:names[type],brand:$('brand').value,size:$('size').value,qty,price,total:qty*price,note:$('note').value});localStorage.setItem(KEY,JSON.stringify(entries));$('note').value='';render();};
$('export').onclick=()=>{let blob=new Blob([JSON.stringify(entries,null,2)],{type:'application/json'});let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='moshiur-lpg-backup.json';a.click();URL.revokeObjectURL(a.href);};
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
render();