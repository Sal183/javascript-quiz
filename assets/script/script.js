function loadDate() {
    currentDay = moment().format('dddd, MMMM Do YYYY - hh:mm');
    $('#currentDay').text(currentDay);
}

loadDate();


function infoColorChange() {
    var currentHour = moment().hour();
    $(".row").each(function() {
        var rowHour = parseInt($(this).attr("id").split("-")[1]);
        if(rowHour < currentHour) {
            $(this).addClass("past");
        } else if(rowHour === currentHour) {
            $(this).removeClass("past");
            $(this).addClass("present");
        } else{
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future")
        }
    });
}

infoColorChange();
let hour = setInterval(infoColorChange, 10000)


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(toDo));
};

function loadTasks() {
  
  var savedList = localStorage.getItem('tasks');

  if (!savedList) {
      return false;
  }

  
  toDo = JSON.parse(savedList);

  
  for (i = 0; i < toDo.length; i++) {
    var taskTxt = toDo[i].text;
    var taskId = toDo[i].id;
    $('#' + taskId).val(taskTxt);
  }
};


$('.saveBtn').click(function() {
    
    var taskTxt = $(this).siblings('.description').val();
    
    var taskId = $(this).siblings('.description').attr('id');
    console.log(taskId);
    
    taskObj = {
        id: taskId,
        text: taskTxt
    }
    toDo.push(taskObj);

    saveTasks();
});


function auditTasks(taskEl) {
    rowHour = parseInt($('.description').parent('.row').attr('id'));

    
    $(taskEl).removeClass('present future past');

    
    if (rowHour === currentHour) {
        console.log('present');
        $(taskEl).addClass('present');
    }
    else if (rowHour < currentHour) {
        console.log('past');
        $(taskEl).addClass('past');
    }
    else if (rowHour > currentHour) {
        console.log('future');
        $(taskEl).addClass('future');
    }
};

loadTasks();

setInterval(function() {
    $('.description').each(function (el){
      auditTasks(el);
    });
}, 5000);