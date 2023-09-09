function count(){
  var thisCount = $("#count").html();
      thisCount = Number(thisCount);
      thisCount = thisCount + 1;
  $("#count").html(thisCount);
}
