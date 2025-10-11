//Filter with child tasks

const filterEl = document.querySelector("#filter")
filterEl.addEventListener('input', function (e) {
    filterValue = filterEl.value;
    gantt.refreshData();
});


let filterValue = "";

function filterLogic(task, match) {
    match = match || false;
    // check children
    gantt.eachParent(function (parent) {
        if (filterLogic(parent)) {
            match = true;
        }
    }, task.id);

    // check task
    if (task.text.toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
        match = true;
    }
    return match;
}

gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
    if (!filterValue) {
        return true;
    }
    return filterLogic(task);
});

