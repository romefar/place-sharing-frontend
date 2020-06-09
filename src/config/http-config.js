export default {
  devDomain: 'http://localhost:3001',
  prodDomain: 'YOUR_PROD_DOMAIN',
  getDomain () {
    if (process.env.NODE_ENV === 'development') {
      return this.devDomain
    }
    return this.prodDomain
  }
}
