/**
 * This method represents Controller for the website. It uses the
 * AdminUserService to perform the CRUD{Create, Read, Update, Delete}
 * operations.
 */
(function () {
  // Input Field Data
  let $usernameFld, $passwordFld;
  let $firstNameFld, $lastNameFld, $roleFld;
  // End of Input Field Data

  // Button data
  let $removeBtn, $editBtn, $createBtn, $updateBtn;
  // End of Button Data

  let $userRowTemplate, $tbody;

  let users = [];

  /**
   * This represents a Service which pings the server to perform the CRUD
   * {Create, Read, Update, Delete} operations.
   * @type {AdminUserServiceClient}
   */
  let userService = new AdminUserServiceClient();

  /**
   * This method is used to create a New User. It adds the data to the server.
   */
  function createUser() {
    const username = $usernameFld.val();
    const password = $passwordFld.val();
    const firstName = $firstNameFld.val();
    const lastName = $lastNameFld.val();
    const role = $roleFld.val();

    emptyFields();

    let user = new User(username, password, firstName, lastName, role);

    userService.createUser(user).then((actualUser) => {
      findAllUsers()
    });
  }

  /**
   * This Method is used to find all the Users currently added to the server.
   */
  function findAllUsers() {
    userService.findAllUsers().then(allUsers => {
      users = allUsers;
      renderUsers()
    })
  }findAllUsers()

  function findUserById() {
  }

  /**
   * This method is used to delete the user information permanently from the
   * server
   * @param index the row index from the Table
   */
  function deleteUser(index) {
    const userId = users[index]._id;
    userService.deleteUser(userId).then(response => {
      users.splice(index, 1);
      renderUsers(users)
    })
  }

  let currentUserIndex = -1;

  /**
   * This method is used to select a particular user. This method updates the
   * input fields.
   * @param index the index of the user from the table.
   */
  function selectUser(index) {
    const userId = users[index]._id;
    currentUserIndex = index;

    userService.findUserById(userId).then((user) => {
      $usernameFld.val(user.username);
      $passwordFld.val(user.password);
      $firstNameFld.val(user.firstName);
      $lastNameFld.val(user.lastName);
      $roleFld.val(user.role);
    })
  }

  /**
   * This method is used to update an existing user.
   */
  function updateUser() {
    if(currentUserIndex == -1){
      return;
    }
    const username = $usernameFld.val();
    const password = $passwordFld.val();
    const firstName = $firstNameFld.val();
    const lastName = $lastNameFld.val();
    const role = $roleFld.val();

    const user = new User(username, password, firstName, lastName, role);

    emptyFields();

    userService.updateUser(users[currentUserIndex]._id, user).then(updatedUser => {
      findAllUsers();
      currentUserIndex = -1;
    })
  }

  /**
   * This method is used to render a single user.
   * @param user the user that has to be rendered on the table.
   * @param index the index of the user from the User array.
   */
  function renderUser(user, index) {
    let rowClone = $userRowTemplate.clone();

    rowClone.removeClass("wbdv-hidden");
    rowClone.removeClass("wbdv-template");

    rowClone.find(".wbdv-username").html(user.username);
    rowClone.find(".wbdv-first-name").html(user.firstName);
    rowClone.find(".wbdv-last-name").html(user.lastName);
    rowClone.find(".wbdv-role").html(user.role);
    rowClone.attr("id", user.id);

    $removeBtn = rowClone.find("#wbdv-remove")
    $removeBtn.click(() => deleteUser(index));

    $editBtn = rowClone.find("#wbdv-edit");
    $editBtn.click(() => selectUser(index));

    $tbody.append(rowClone);
  }

  /**
   * This method is used to render all users. It uses a helper method
   * {@link renderUser} to render users.
   */
  function renderUsers() {
    console.log("render users",users)
      $tbody.empty();
      for(let u in users) {
        let user = users[u];
        renderUser(user, u);
      }
  }

  /**
   * This method is used to empty all the input fields.
   */
  function emptyFields() {
    $usernameFld.val("");
    $passwordFld.val("");
    $firstNameFld.val("");
    $lastNameFld.val("");

    $($roleFld).ready(function() {
      $('select option:contains("Faculty")').prop('selected', true);
    })
  }

  /**
   * This is a method to initialize all the fields.
   */
  function main() {
    $usernameFld = $("#usernameFld");
    $passwordFld = $("#passwordFld");

    $createBtn = $(".wbdv-create");
    $updateBtn = $(".wbdv-update");

    $firstNameFld = $("#firstNameFld");
    $lastNameFld = $("#lastNameFld");
    $roleFld = $("#roleFld");

    $tbody = $(".wbdv-tbody");
    $userRowTemplate = $(".wbdv-template");

    $createBtn.click(createUser);
    $updateBtn.click(updateUser);
  }

  $(main);

})();