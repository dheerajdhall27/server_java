/**
 * This class Represents a Service which interacts with the server to perform
 * CRUD operations {Create, Read, Update, Delete}.
 */
function AdminUserServiceClient() {
  this.createUser = createUser;
  this.findAllUsers = findAllUsers;
  this.findUserById = findUserById;
  this.deleteUser = deleteUser;
  this.updateUser = updateUser;
  this.url = 'https://wbdv-generic-server.herokuapp.com/api/dheerajdhall/users';
  var self = this;

  /**
   * This method is used to performe the Create operation by performing the POST
   * request.
   * @param user the user that needs to be created
   * @returns {Promise<any>}
   */
  function createUser(user) {
    return fetch(self.url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    });
  }

  /**
   * This method is used to find all the users. This method performs the GET
   * request for all the users.
   * @returns {Promise<any>}
   */
  function findAllUsers() {
    return fetch(self.url).then(function (response) {
      return response.json();
    })
  }

  /**
   * This method is used to find a particular user using the ID. This method
   * performs the GET request.
   * @param userId the userId of the user whose data is retrieved.
   * @returns {Promise<any>}
   */
  function findUserById(userId) {
    return fetch(`${self.url}/${userId}`).then((response) => {
      return response.json();
    });
  }

  /**
   * This method is used to update a particular user. This method performs a
   * PUT request.
   * @param userId the Id of the user that needs to be updated.
   * @param user the new user information
   * @returns {Promise<any>}
   */
  function updateUser(userId, user) {
    return fetch(`${self.url}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  /**
   * This method is used to delete a particular user. This method performs a
   * DELETE request.
   * @param userId the userId of the user that needs to be deleted
   * @returns {Promise<Response>}
   */
  function deleteUser(userId) {
    return fetch(`${self.url}/${userId}`, {
      method: "DELETE"
    });
  }
}
