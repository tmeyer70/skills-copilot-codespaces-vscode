function skillsMember() {
  var member = document.getElementById("skillsMember");
  var memberName = member.options[member.selectedIndex].value;
  document.getElementById("skillsMemberName").innerHTML = memberName;
}