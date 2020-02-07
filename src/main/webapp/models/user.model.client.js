/**
 * This is a User model to instantiate a User Object. It holds the information
 * connected to the user
 * @param username the username the user uses for login
 * @param password the password for login
 * @param firstName the First name of the user
 * @param lastName the Last name of the user
 * @param role the role of the user {Faculty, Student Or Admin}
 */
function User(username, password, firstName, lastName, role) {
  this.username = username;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.role = role;

  this.setUsername = setUsername;
  this.getUsername = getUsername;
  this.setPassword = setPassword;
  this.getPassword = getPassword;
  this.setFirstName = setFirstName;
  this.getFirstName = getFirstName;
  this.setLastName = setLastName;
  this.getLastName = getLastName;
  this.setRole = setRole;
  this.getRole = getRole;

  function setUsername(username) {
    this.username = username;
  }

  function getUsername() {
    return this.username;
  }

  function setPassword(password) {
    this.password = password;
  }

  function getPassword() {
    return this.password;
  }

  function setFirstName(firstName) {
    this.firstName = firstName;
  }

  function getFirstName() {
    return this.firstName;
  }

  function setLastName(lastName) {
    this.lastName = lastName;
  }

  function getLastName() {
    return this.lastName;
  }

  function setRole(role) {
    this.role = role;
  }

  function getRole() {
    return this.role;
  }
}
