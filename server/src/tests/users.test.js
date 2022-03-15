const resolvers = require('../resolvers')

describe("Test User Controller", () => {

    const dataUserTest = {
        name: "testJest",
        id: -1,
        email: "testjest@teste.com"
    }
    
    const newEmailTest = "testjestv2@teste.com"


    test('Creation', () => {
        expect(resolvers.Mutation.createUser(null, dataUserTest)).toMatchObject({
            name: dataUserTest.name,
            email: dataUserTest.email
        });
    });

    test('Search by ID', () => {
        expect(resolvers.Query.user(null, {id: dataUserTest.id})).toMatchObject({
            name: dataUserTest.name,
            email: dataUserTest.email
        });
    });

    test('Update', () => {
        expect(resolvers.Mutation.createUser(null, {
            name: dataUserTest.name,
            email: newEmailTest,
            id: dataUserTest.id
        })).toMatchObject({
            email: newEmailTest
        });
    });
    
    test('Delete', () => {
        expect(resolvers.Mutation.deleteUser(null, { id: dataUserTest.id})).toMatchObject({
            name: dataUserTest.name,
            email: newEmailTest
        });
    });
})