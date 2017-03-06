
const Slider = {

  showValue(newValue){
    document.getElementById("range").innerHTML=newValue;
  },

  setValue(value){
    document.getElementById("range").value=value;
  }
}

module.exports = Slider;
