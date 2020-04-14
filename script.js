//Resources used by different functions on different webpages inner working.
var allusers = [];
//var assignIssuesList = [];
var i = 0;
//Logged user object initialization.
var loggeduser = {
    nameLogged: '',
    fullnameLogged: ''
}
//Scripts for SUITE home page starts here.
function ChoosingTasklist() {
    window.open("index.html", "_self");
}

function ChoosingIssueManager() {
    window.open("issueIndex.html", "_self");
}

function ChoosingBookmarkManager() {
    window.open("bookmarkIndex.html", "_self");
}

//Scripts for BOOKMARK MANAGER operations starts here.

function LoginCheck_bookmarkManager() {
    var userNameTry = document.getElementById('userName').value;
    var passWordTry = document.getElementById('passWord').value;
    var userLedger = JSON.parse(localStorage.getItem('allusers'));

    var flag = false;

    if (document.getElementById('userName').value == '' || document.getElementById('passWord').value == '') {
        alert("Login Failed");
    } else {
        for (var i = 0; i < userLedger.length; i++) {
            if ((userNameTry == userLedger[i].username) && (passWordTry == userLedger[i].password)) {
                loggeduser.nameLogged = userLedger[i].username;
                loggeduser.fullnameLogged = userLedger[i].fullname;

                localStorage.setItem('loggedUser', JSON.stringify(loggeduser));

                flag = true;
                break;
            }
            if ((userNameTry != userLedger[i].username) || (passWordTry != userLedger[i].password)) {
                flag = false;
            }
        }
        if (flag == true) {
            alert("Welcome ");
            window.open("bookmarkManager.html", "_self");
        } else {
            alert("Try again.");

            $('#userName').val('');
            $('#passWord').val('');
        }
    }
}

function loginOut_bookmarkManager() {
    localStorage.removeItem('loggedUser');
    window.open("bookmarkIndex.html", "_self");
}

function bookmarkOnload() {
    Showloggedname();
    ShowBookmarkCard();
}

var indexCard = 0;

function AddingBookmark() {

    var bookmark = {
        websiteName: '',
        websiteURL: '',
    };

    bookmark.websiteName = $('#bookmark_Name').val();
    bookmark.websiteURL = $('#bookmark_url').val();

    if ($('#bookmark_Name').val() == '' || $('#bookmark_url').val() == '') {
        alert("You missing one field.")
    } else {
        var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
        var bookmarkList = JSON.parse(localStorage.getItem('Allbookmarks'));

        if (bookmarkList == null) {
            bookmarkList = [];
        }

        bookmarkList.push(bookmark);

        localStorage.setItem('Allbookmarks', JSON.stringify(bookmarkList));

        card = '';

        ShowBookmarkCard();

        $('#bookmark_Name').val('');
        $('#bookmark_url').val('');
    }
    indexCard++;
}

function ShowBookmarkCard() {
    var card = '';

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var bookmarkList = JSON.parse(localStorage.getItem('Allbookmarks'));

    var j = i;
    for (var j in bookmarkList) {
        card +=
            '<div class="card bg-light mb-2" style="width: 50%" id="bookmark' + j + '">\
        <div class="card-body">\
            <h5 class="card-title">' + bookmarkList[j].websiteName + '</h5>\
            <p class="card-text"></p>\
            <p class="card-text">\
            </p>\
        </div>\
        <div class="card-footer bg-transparent border-light" style="text-align: right">\
            <button type="button" id="visitBookmark" onclick="visitBookmark(' + j + ')" class="btn btn-light btn-sm">Visit</button>\
            <button type="button" id="removeBookmark" onclick="removeBookmark(' + j + ')" class="btn btn-danger btn-sm">Delete</button>\
            <button type="button" id="editBookmark" class="btn btn-dark btn-sm" onclick="editBookmark(' + j + ')" data-toggle="modal" data-target="#myModal">Edit</button>\
        </div>\
    </div>';
    }
    $('#contentPanel').html(card);
}

function removeBookmark(i) {
    var bookmarkList = JSON.parse(localStorage.getItem('Allbookmarks'))

    bookmarkList.splice(i, 1);
    $('#bookmark' + i).remove();

    localStorage.setItem('Allbookmarks', JSON.stringify(bookmarkList));
    ShowBookmarkCard();
}

function visitBookmark(i) {
    var bookmarkList = JSON.parse(localStorage.getItem('Allbookmarks'))

    for (var j in bookmarkList) {
        j = i;
        var url = bookmarkList[j].websiteURL;
    }
    console.log(url);
    window.open(url, "_blank");
}

function saveChangesbookmark() {
    var bookmarkList = JSON.parse(localStorage.getItem('Allbookmarks'))
    var newUrl = $('#newBookmark_url').val();
    var oldUrl = $('#oldBookmark_url').val();

    if ($('#newBookmark_url').val() == '') {
        alert("You need to enter the URL.")
    } else {

        for (let i = 0; i < bookmarkList.length; i++) {
            if (bookmarkList[i].websiteURL == oldUrl) {
                bookmarkList[i].websiteURL = newUrl;
            }
        }
        localStorage.setItem('Allbookmarks', JSON.stringify(bookmarkList));
        $('#myModal').modal('hide');
    }
}

function editBookmark(i) {
    var bookmarkList = JSON.parse(localStorage.getItem('Allbookmarks'))
    var oldUrl = bookmarkList[i].websiteURL;

    console.log(oldUrl);
    $('#oldBookmark_url').val(oldUrl);

    $('#myModal').modal('show');
}

//Scripts for ISSUE MANAGER operations starts here.
function LoginCheck_IssueManager() {

    var userNameTry = document.getElementById('userName').value;
    var passWordTry = document.getElementById('passWord').value;
    var userLedger = JSON.parse(localStorage.getItem('allusers'));

    var flag = false;

    if (document.getElementById('userName').value == '' || document.getElementById('passWord').value == '') {
        alert("Login Failed");
    } else {
        for (var i = 0; i < userLedger.length; i++) {
            if ((userNameTry == userLedger[i].username) && (passWordTry == userLedger[i].password)) {
                loggeduser.nameLogged = userLedger[i].username;
                loggeduser.fullnameLogged = userLedger[i].fullname;

                localStorage.setItem('loggedUser', JSON.stringify(loggeduser));

                flag = true;
                break;
            }
            if ((userNameTry != userLedger[i].username) || (passWordTry != userLedger[i].password)) {
                flag = false;
            }
        }
        if (flag == true) {
            alert("Welcome ");
            window.open("issuemanager.html", "_self");
        } else {
            alert("Try again.");

            $('#userName').val('');
            $('#passWord').val('');
        }
    }
}

function loginOut_IssueManager() {
    localStorage.removeItem('loggedUser');
    window.open("issueIndex.html", "_self");
}

function AddingIssue() {

    var Issue = {
        description: '',
        severity: '',
        assignto: '',
        id: '',
        status: ''
    };

    Issue.description = $('#issue_description').val();
    Issue.severity = $('#issue_severity').val();
    Issue.assignto = $('#issue_assignedto').val();
    Issue.id = Math.floor((Math.random() * 250) + 25);
    Issue.status = 'Open';


    if ($('#issue_description').val() == '' || $('#issue_severity').val() == '' || $('#issue_assignedto').val() == '') {
        alert("You missing one field.")
    } else {
        var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
        var issueList = JSON.parse(localStorage.getItem('AllIssues'));

        if (issueList == null) {
            issueList = [];
        }

        issueList.push(Issue);

        localStorage.setItem('AllIssues', JSON.stringify(issueList));
        console.log(issueList);

        card = '';

        ShowIssueCard();
        //SortingIssuesbyPeople();

        $('#issue_description').val('');
        $('#issue_severity').val('');
        $('#issue_assignedto').val('');
    }
}

function ShowIssueCard() {

    var card = '';

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var issueList = JSON.parse(localStorage.getItem('AllIssues'));

    for (var i in issueList) {
        card +=
            '<div class="card bg-light mb-3" style="width: 100%" id="iCard' + i + '" >\
            <div class="card-header"><i class="fas fa-file"></i> Issue #' + issueList[i].id + '</div>\
            <div class="card-body">\
                <h5 class="card-title">Description: </h5>\
                <p class="card-text">' + issueList[i].description + '</p>\
                <p class="card-text">\
                    <i class="fas fa-user-check">  </i>' + issueList[i].assignto + '\
                    <i class="fas fa-fire">  </i>' + issueList[i].severity + '\
                </p>\
            </div>\
            <div class="card-footer bg-transparent border-light" style="text-align: right">\
                <p>Status: <button type="button" id="Status" onclick="CLosingIssues(' + i + ')" class="btn btn-light btn-sm">Open</button></p>\
            </div>\
        </div>';
    }
    $('#contentPanel').html(card);
}

function PopulatingDropDown() {
    var userAvailable = JSON.parse(localStorage.getItem('allusers'));

    var newSelect = document.getElementById('issue_assignedto');

    for (i = 0; i < userAvailable.length; i = i + 1) {
        var option = document.createElement('option');
        option.value = userAvailable[i].fullname;
        option.text = userAvailable[i].fullname;

        newSelect.appendChild(option);
    }
}

function IssuePageLoad() {
    PopulatingDropDown();
    ShowIssueCard();
    Showloggedname()
}

function CLosingIssues(i) {
    $('#Status').text("Closed");

    var AllIssues = JSON.parse(localStorage.getItem('AllIssues'));
    AllIssues[i].status = "Closed";

    localStorage.setItem('AllIssues', JSON.stringify(AllIssues));
    ShowIssueCard();

    console.log();
}

//Scripts for TASK MANAGER operations Start here.
// User and Task arrays.

//GLobal Variables.
var title;
var description;
var card = '';

//Create user account. Saving all user data on localStorage for future access.
function CreatingAccount() {

    var user = {
        username: '',
        password: '',
        email: '',
        fullname: ''
    };

    var flag = false;

    if (document.getElementById('userNameCreation').value == '' || document.getElementById('passWordCreation').value == '' || document.getElementById('emailCreation').value == '' || document.getElementById('fullNameCreation').value == '') {
        alert("Look again!");
    } else {

        user.username = document.getElementById('userNameCreation').value;
        user.password = document.getElementById('passWordCreation').value;
        user.email = document.getElementById('emailCreation').value;
        user.fullname = document.getElementById('fullNameCreation').value;

        allusers.push(user);
        localStorage.setItem('allusers', JSON.stringify(allusers));

        alert("Account Created!")

        document.getElementById('userNameCreation').value = '';
        document.getElementById('passWordCreation').value = '';
        document.getElementById('emailCreation').value = '';
        document.getElementById('fullNameCreation').value = '';
    }
}

//Check if the credentials being used to login are correct and they match the user logged.
function LoginCheck() {

    var userNameTry = document.getElementById('userName').value;
    var passWordTry = document.getElementById('passWord').value;
    var userLedger = JSON.parse(localStorage.getItem('allusers'));

    var flag = false;

    if (document.getElementById('userName').value == '' || document.getElementById('passWord').value == '') {
        alert("Login Failed");
    } else {
        for (var i = 0; i < userLedger.length; i++) {
            if ((userNameTry == userLedger[i].username) && (passWordTry == userLedger[i].password)) {
                loggeduser.nameLogged = userLedger[i].username;
                loggeduser.fullnameLogged = userLedger[i].fullname;

                localStorage.setItem('loggedUser', JSON.stringify(loggeduser));

                flag = true;
                break;
            }
            if ((userNameTry != userLedger[i].username) || (passWordTry != userLedger[i].password)) {
                flag = false;
            }
        }
        if (flag == true) {
            alert("Welcome ");
            window.open("list.html", "_self");
        } else {
            alert("Try again.");

            $('#userName').val('');
            $('#passWord').val('');
        }
    }
}

//Adds a task under the user currently logged in.
function AddingTask() {

    //Creates the task object with the following attributes.
    var task = {
        taskTitle: '',
        taskdescription: '',
        status: false
    }

    //Gets values from the title and description of the task.
    task.taskTitle = $('#title_textbox').val();
    task.taskdescription = $('#task_textbox').val();

    //Checks if the textboxes are filled, adding some validation to the user data entry.
    if (title == '' || description == '') {
        alert("You need to enter a task.")
    }

    //Fills the object created before.
    else {
        var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
        var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged))

        if (taskList == null) {
            taskList = [];
        }

        //The object is pushed to the task global array.
        taskList.push(task);

        //The information kept in the key 'loggedUser' is moved to the local variable 'userLoggedname'.
        console.log(userLoggedname);

        //All the task previously entered are linked to the user currently logged in on the system.
        localStorage.setItem(userLoggedname.nameLogged, JSON.stringify(taskList));
        console.log(taskList);

        //Cleaning before displaying.
        card = '';

        //The task is displayed.
        ShowCard();

        //All the textboxes are clear.
        $('#title_textbox').val('');
        $('#task_textbox').val('');
    }
}

//Shows the visual representation of the task added.
function ShowCard() {
    var card = '';

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged));

    for (var i in taskList) {
        if (taskList[i].status == true) {
            card +=
                '<div class="card border-light  mb-3" id="Cards"  style="max-width: 18rem;"></div>' +
                '<div class ="card bg-success" id ="Panel' + i + '">\
            <div class = "card-header bg-transparent border-light"> <span id="cardheader"> ' + taskList[i].taskTitle + ' </span></div>\
                <div class="btn" id="cardButton" onclick="cambiarClass(' + i + ')">\
                    <div class = "card-body text-success"><p class = "card-text" id="taskdescription">' + taskList[i].taskdescription + '</p>\
                    </div>\
                </div>\
            <div class="card-footer bg-transparent border-success">\
                <button type="button" id="deleteTask" onclick="deleteTask(' + i + ')" class="btn btn-light btn-sm">Close</button>\
                </div>\
            </div>'
        } else {
            card +=
                '<div class="card border-light  mb-3" id="Cards"  style="max-width: 18rem;"></div>' +
                '<div class ="card" id ="Panel' + i + '">\
             <div class = "card-header bg-transparent border-light"> <span id="cardheader"> ' + taskList[i].taskTitle + ' </span></div>\
                <div class="btn" id="cardButton" onclick="cambiarClass(' + i + ')">\
                    <div class = "card-body text-success"><p class = "card-text" id="taskdescription">' + taskList[i].taskdescription + '</p>\
                    </div>\
                </div>\
            <div class="card-footer bg-transparent border-light">\
                <button type="button" id="deleteTask" onclick="deleteTask(' + i + ')" class="btn btn-light btn-sm">Close</button>\
                </div>\
            </div>'
        }
    }
    $('#contentPanel').html(card);
}

//Remove all the tasks with the status completed.
function removecompletedTask() {
    var card = '';

    var aux = [];

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged));

    for (let j = 0; j <= taskList.length - 1; j++) {
        if (taskList[j].status == false) {
            aux.push(taskList[j]);

            $('#Panel' + j).remove();
        }
    }
    localStorage.setItem(userLoggedname.nameLogged, JSON.stringify(aux));
    ShowCard();
}

function ShowincompleteTask() {
    var card = '';

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged));

    for (var i in taskList) {
        if (taskList[i].status == true) {
            card +=
                '<div class="card border-light  mb-3" id="Cards"  style="max-width: 18rem;"></div>' +

                '<div class ="card bg-success" id ="Panel' + i + '">\
            <div class = "card-header bg-transparent border-light"> <span id="cardheader"> ' + taskList[i].taskTitle + ' </span></div>\
                     <div class="btn" id="cardButton" onclick="cambiarClass(' + i + ')">\
            <div class = "card-body text-success"><p class = "card-text" id="taskdescription">' + taskList[i].taskdescription + '</p>\
                    </div>\
                    </div>\
                <div class="card-footer bg-transparent border-light">\
                <button type="button" id="deleteTask" onclick="deleteTask(' + i + ')" class="btn btn-light btn-sm">Close</button>\
            </div>\
            </div>'
        }
    }
    $('#contentPanel').html(card);
}

function ShowcompleteTask() {
    var card = '';

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged));

    for (var i in taskList) {
        if (taskList[i].status == false) {
            card +=
                '<div class="card border-light  mb-3" id="Cards"  style="max-width: 18rem;"></div>' +

                '<div class ="card" id ="Panel' + i + '">\
            <div class = "card-header bg-transparent border-light"> <span id="cardheader"> ' + taskList[i].taskTitle + ' </span></div>\
                     <div class="btn" id="cardButton" onclick="cambiarClass(' + i + ')">\
            <div class = "card-body text-success"><p class = "card-text" id="taskdescription">' + taskList[i].taskdescription + '</p>\
                    </div>\
                    </div>\
                <div class="card-footer bg-transparent border-light">\
                <button type="button" id="deleteTask" onclick="deleteTask(' + i + ')" class="btn btn-light btn-sm">Close</button>\
            </div>\
            </div>'
        }
    }
    $('#contentPanel').html(card);
}

//Delete the selected task.
function deleteTask(i) {
    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged))

    taskList.splice(i, 1);
    $('#Panel' + i).remove();

    localStorage.setItem(userLoggedname.nameLogged, JSON.stringify(taskList));
    console.log(i);
}

//Show the username logged in the top left corner.
function Showloggedname() {
    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    $('#username').html(userLoggedname.fullnameLogged);
}

//Card class change when clicked on it. Changing the status of the card.
function cambiarClass(i) {
    $('#Panel' + i).toggleClass('bg-success');

    var userLoggedname = JSON.parse(localStorage.getItem('loggedUser'));
    var taskList = JSON.parse(localStorage.getItem(userLoggedname.nameLogged))
    taskList[i].status = !taskList[i].status;

    localStorage.setItem(userLoggedname.nameLogged, JSON.stringify(taskList));
    ShowCard();
}

//Prints all the cards once the page is refreshed.
function pageLoad() {
    Showloggedname();
    ShowCard();
}

//Log out of the Task list page , while removing the current logged user from localstorage.
function loginOut() {
    localStorage.removeItem('loggedUser');
    window.open("index.html", "_self");
}