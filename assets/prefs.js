/* Apply saved preferences before the page draws, so it doesn't flash.
   Load this in <head> without async/defer.
   - Style: ?style=pbs or ?style=personal in the URL wins; otherwise the saved choice.
   - Theme: the saved light/dark choice; otherwise the system setting. */
(function(){
  var r=document.documentElement, b=null, t=null;
  try{ b=new URLSearchParams(location.search).get("style"); }catch(e){}
  if(b!=="pbs"&&b!=="personal"){ try{ b=localStorage.getItem("proto-brand"); }catch(e){} }
  if(b==="pbs") r.setAttribute("data-brand","pbs");
  try{ t=localStorage.getItem("proto-theme"); }catch(e){}
  if(t==="light"||t==="dark") r.setAttribute("data-theme",t);
})();
