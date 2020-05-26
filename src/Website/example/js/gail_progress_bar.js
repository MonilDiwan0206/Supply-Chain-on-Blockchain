var progress1 = document.getElementById("progress1");
var progress2 = document.getElementById("progress2");
var progress3 = document.getElementById("progress3");
var progress4 = document.getElementById("progress4");
var progress5 = document.getElementById("progress5");

var status=0;
if(status==0)
  {
    progress1.className="step-progress-item current";
  }
else if(status==1)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item current";
  }
else if(status==2)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item current";
  }
else if(status==3)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item is-done";
    progress4.className="step-progress-item current";
  }
else if(status==4)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item is-done";
    progress4.className="step-progress-item is-done";
    progress5.className="step-progress-item current";
  }
else if(status==5)
  {
    progress1.className="step-progress-item is-done";
    progress2.className="step-progress-item is-done";
    progress3.className="step-progress-item is-done";
    progress4.className="step-progress-item is-done";
    progress5.className="step-progress-item is-done";
  }
else {}
