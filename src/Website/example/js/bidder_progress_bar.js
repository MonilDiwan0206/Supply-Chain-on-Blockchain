var progress1 = document.getElementById("progress1");
var progress2 = document.getElementById("progress2");
var progress3 = document.getElementById("progress3");
var progress4 = document.getElementById("progress4");
var progress5 = document.getElementById("progress5");
var button_class1 = document.getElementById("button-class1");
var button_class2 = document.getElementById("button-class2");
var button_class3 = document.getElementById("button-class3");
var button_class4 = document.getElementById("button-class4");
var button_class5 = document.getElementById("button-class5");

progress1.className="step-progress-item current";
button_class1.style.visibility= "visible";

function statechange(status){
 if(status==1)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item current";
    button_class1.style.visibility= "hidden";
    button_class2.style.visibility= "visible";
  }
else if(status==2)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item current";
    button_class2.style.visibility= "hidden";
    button_class3.style.visibility= "visible";
  }
else if(status==3)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item is-done";
    progress4.className="step-progress-item current";
    button_class3.style.visibility= "hidden";
    button_class4.style.visibility= "visible";
  }
else if(status==4)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item is-done";
    progress4.className="step-progress-item is-done";
    progress5.className="step-progress-item current";
    button_class4.style.visibility= "hidden";
    button_class5.style.visibility= "visible";
  }
else if(status==5)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item is-done";
    progress4.className="step-progress-item is-done";
    progress5.className="step-progress-item is-done";
    button_class5.style.visibility= "hidden";
  }
else {}
}
