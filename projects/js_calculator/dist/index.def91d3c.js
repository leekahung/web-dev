let e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`),window.addEventListener("resize",(()=>{window.innerHeight,document.documentElement.style.setProperty("--vh",`${e}px`)}));const t=new Map([[0,"Del"],[1,"^"],[2,"("],[3,")"],[4,"+"],[5,"e"],[6,"7"],[7,"8"],[8,"9"],[9,"-"],[10,"π"],[11,"4"],[12,"5"],[13,"6"],[14,"x"],[15,"|a|"],[16,"1"],[17,"2"],[18,"3"],[19,"/"],[20,"ans"],[21,"0"],[22,"."],[23,"CE"],[24,"="]]),n=document.getElementById("calc-grp__buttons"),a=document.getElementById("calc-grp__input"),r=document.getElementById("calc-grp__output"),c=(e,t)=>{const n=["0.5","0.6"," 0.3","0.5"],a=["200, 0, 0","255, 127, 0"],r=["mouseover","mouseout","mousedown","mouseup"],c=t=>{e.style.backgroundColor=`rgba(${t},${n[1]})`;for(let a=0;a<r.length;a++)e.addEventListener(r[a],(e=>{e.target.style.backgroundColor=`rgba(${t},${n[a]})`}))};"CE"===t?c(a[0]):"="===t&&c(a[1])},s=(e,n)=>{const c=["+","-","/","x",".","^"],s=["|a|"],d=["Del","CE","=","ans"];let b;if(b="click"==n?t.get(e):e,"0"===a.innerText)switch(!0){case[...c].includes(b):a.innerText+=b;break;case[...d].includes(b):o();break;case[...s].includes(b):a.innerText="abs(";break;default:a.innerText=b}else if([...c].includes(a.innerText.slice(-1)))switch(b){case"CE":o();break;case"Del":l(a.innerText);break;case"=":if(")"===b){i(a.innerText);break}break;case"|a|":a.innerText+="abs(";break;default:if([...c].includes(b)){if(-1!==a.innerText.search(/a/g)&&")"===a.innerText.slice(-1)){a.innerText+=b;break}a.innerText=a.innerText.slice(0,a.innerText.length-1)+b;break}a.innerText+=b}else switch(b){case"CE":o();break;case"Del":l(a.innerText);break;case"=":i(a.innerText);break;case"|a|":a.innerText+="abs(";break;case"ans":a.innerText=r.innerText;break;default:a.innerText+=b}},i=e=>{if(-1!==e.search(/[\(\)]/)&&e.match(/\(/g).length!==e.match(/\)/g).length)return;-1!==(e=e.replace(/x/g,"*").replace(/\^/g,"**").replace(/\π/g,"Math.PI").replace(/e/g,"Math.E")).search(/a/g)&&(e=e.replace(/abs/g,"Math.abs"));const t=Math.round(10**14*Function("return "+e)())/10**14;r.innerText=t>10**14?t.toExponential(7):t},l=e=>{1===e.length?a.innerText="0":a.innerText=e.slice(0,e.length-1)},o=()=>{a.innerText="0",r.innerText="0"};((e,a)=>{n.style.setProperty("--grid-rows",e),n.style.setProperty("--grid-cols",a);for(let r=0;r<e*a;r++){const e=document.createElement("div");switch(e.innerText=t.get(r),n.appendChild(e).className="calc-grp__grid-buttons",n.appendChild(e).style.cursor="pointer",t.get(r)){case"CE":c(n.appendChild(e),"CE");break;case"=":c(n.appendChild(e),"=")}n.appendChild(e).onclick=function(){s(r,"click")}}})(5,5),o(),document.addEventListener("keydown",(e=>{switch(e.key){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"+":case"-":case"/":case"(":case")":case"^":case".":s(e.key,"keyboard");break;case"x":case"*":s("x","keyboard");break;case"Backspace":if(!1===e.shiftKey){s("Del","keyboard");break}s("CE","keyboard");break;case"=":case"Enter":s("=","keyboard");break;case"e":s("e","keyboard");break;case"a":s("|a|","keyboard");break;case"p":s("π","keyboard")}}));const d=document.getElementById("bottom-grp__move-calc-btn");d.addEventListener("click",(()=>{"Move Calculator Left"===d.innerText?(d.innerText="Move Calculator Right",document.body.style.flexDirection="row"):(d.innerText="Move Calculator Left",document.body.style.flexDirection="row-reverse")}));
//# sourceMappingURL=index.def91d3c.js.map
