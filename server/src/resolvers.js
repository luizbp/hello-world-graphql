let users = [
  { id: 1, name: "Luiz", email: "luiz@luiz.com" },
  { id: 2, name: "Cecilia", email: "Cecilia@cecilia.com" },
];

module.exports = {
  // Tipo de função que busca os dados, semelhante ao GET
  Query: {
    users: () => users,
    user: (_, { id }) => {
      let teste = users.filter((user) => {
        return user.id === parseInt(id);
      });
      return teste.length ? teste[0] : [];
    },
  },

  // Tipo de funções que alteram os dados, semelhante ao POST, PUT, PATCH, DELETE
  Mutation: {
    createUser: (_, { name, email }) => {
      // Busca o ultimo id do Array
      let lastId = users.length ? users[users.length - 1].id : 0;

      let id = lastId + 1;
      
      // insere o novo user
      users.push({ id, name, email });
      return {
        id,
        name,
        email,
      };
    },
    updateUser: (_, { id, name, email }) => {
      let teste = users.filter((user) => {
        return user.id === parseInt(id);
      });

      if(!teste.length) return []

      teste[0].name = name
      teste[0].email = email
      return teste[0];
    },
    deleteUser: (_, { id}) => {
      let userDeleted = null
      users = users.filter((user, index) => {
        if (user.id == parseInt(id)) {
          userDeleted = user
          return false
        }

        return true
      });

      return userDeleted;
    },
  },
};
