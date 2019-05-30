const user = {
  _id: '1',
  name: 'Oleg',
  email: 'olivanov@hotmail.com',
  picture: 'https://aws.storage.com/me.jpg'
}

module.exports = {
  Query: {
    me: () => user
  }
}