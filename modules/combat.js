module.exports = {
  roll: function(client){
    min = 0;
    max = 20
    return Math.floor(Math.random() * (max - min)) + min;
  }
}