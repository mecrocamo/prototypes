/* Wires up the shared controls: the "◑ Theme" button (#themeBtn) and the
   footer style link (#styleBtn: "PBS-ify this page" / "Make it Mary").
   Choices are saved per viewer in localStorage. */
(function(){
  var r=document.documentElement;

  var themeBtn=document.getElementById("themeBtn");
  function currentTheme(){
    var t=r.getAttribute("data-theme");
    if(t) return t;
    return (window.matchMedia&&matchMedia("(prefers-color-scheme:dark)").matches)?"dark":"light";
  }
  if(themeBtn) themeBtn.addEventListener("click",function(){
    var next=currentTheme()==="dark"?"light":"dark";
    r.setAttribute("data-theme",next);
    try{ localStorage.setItem("proto-theme",next); }catch(e){}
  });

  var styleBtn=document.getElementById("styleBtn");
  function isPbs(){ return r.getAttribute("data-brand")==="pbs"; }
  function setBrand(b, save){
    if(b==="pbs") r.setAttribute("data-brand","pbs"); else r.removeAttribute("data-brand");
    if(styleBtn) styleBtn.textContent = b==="pbs" ? "Make it Mary" : "PBS-ify this page";
    if(save){ try{ localStorage.setItem("proto-brand", b); }catch(e){} }
  }
  setBrand(isPbs()?"pbs":"personal", false);
  if(styleBtn) styleBtn.addEventListener("click",function(){ setBrand(isPbs()?"personal":"pbs", true); });
})();
