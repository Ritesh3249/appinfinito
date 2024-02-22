function randomAlphaNumaric (length){
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let productId = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      productId += charset.charAt(randomIndex);
    }
  
    return productId;
}

module.exports={
    randomAlphaNumaric
}