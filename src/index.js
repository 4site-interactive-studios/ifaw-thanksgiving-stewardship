import IFAWts from "./app/app";
import "./scss/main.scss";
//run();
window.addEventListener("load", function () {
  window.IFAWts = IFAWts;
  let ifawts = new IFAWts();
});
