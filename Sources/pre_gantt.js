
//The Specefic Features Start



// Fuctions that do other things in The timeline scale specification "Start"
function dateandscalesizes (){

       
	gantt.config.wide_form = 1;


    gantt.config.date_format="%Y-%m-%d %H:%i";     
/*   
    gantt.locale.labels.baseline_enable_button = 'Set';
    gantt.locale.labels.baseline_disable_button = 'Remove';
    
gantt.config.scale_unit = "day";
gantt.config.date_scale = "%d %F";
gantt.config.min_column_width = 40;
gantt.config.scale_height = 20 * 3;
*/       

gantt.config.scale_height = 70;
gantt.config.scales = [
    {
        unit: "year",
        step: 1,
        date: "%Y"
    },
    {
        unit: "month",
        step: 1,
        date: "%M"
    },
    {
        unit: "week",
        step: 1,
        date: "%W %M"
    },
    {
        unit: "day",
        step: 1,
        date: "%d %M"
    }
];



};
// Fuctions that do other things in The timeline scale specification "End"





// Fuctions that do other things in the page Declared as Object "Start"
var otherFunctions = {


saveganttorder: function savestate(){
    
   console.log("Savegantt order started");
    otherFunctions.stopgantt();
    console.log("Stopgantt()  started");

    var rootRef = firebase.database().ref();
              var finaltasks = {} ;
              order();

            
              function order(){
                // Firebase setup
            
            
            
            
              
              
            
            
                  rootRef.once('value').then(function(snapshot) {
                      var data = JSON.parse(JSON.stringify(snapshot.val()));
                      
                      console.log("Unsorted Tasks:", data.tasks);})
            
            
            
            
            
            
                  // Use orderByChild to order by the 'sort_order' property
                  rootRef.child("tasks").orderByChild("sort_order").once('value')
                    .then(function(snapshot) {
            
            
                      const orderedTasks = {  addElem(elem) {
                // obj.length is automatically incremented
                // every time an element is added.
                [].push.call(this, elem);
              },}; 
                  
              snapshot.forEach(childSnapshot => {
                   
            
            
                        orderedTasks.addElem(childSnapshot.val()); // Push each sorted task into an array
                      });
                    
                      delete orderedTasks.addElem;
                      delete orderedTasks.length;
                      finaltasks = orderedTasks;

                      
                      console.log("Query Ordered Tasks:", orderedTasks); // Ordered by sort_order ascending
                      setvalues();   // Call the setvalues after the ordering completed
               
                     //otherFunctions.reintgantt();
                      
                     })
                    .catch(function(error) {
                      console.error("Error fetching ordered tasks:", error);
                    });
            
                    
            
            
            
                  };
            
            
            
            function setvalues(){
              rootRef.child("tasks").set(finaltasks); 
            
            }
             
},


stopgantt: function stopgantt1(){
    gantt.destructor();

},

reintgantt: function reinit1(){
    location.reload();
    gantt.init("gantt_here");
    initializeAndLoadDataFromFirebase();

},

collapseAll:function collapseAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.close(task.id)
        })
    })
},

expandAll: function expandAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.open(task.id)
        })
    })
},



}
// Fuctions that do other things in the page Declared as Object "End"





var calnom;

// Colmun Visibilty "Start"
var colmunVisibility = {
  
    visible: function visible(calnom){
        gantt.config.columns[calnom].hide = false;
        gantt.render();
    },
    
    invisible: function invisible(calnom){
        gantt.config.columns[calnom].hide = true;
        gantt.render();    
    },
    
    }
// Colmun Visibilty "End"

// Colmun Zoom "Start"
var colmunZoom = {
    
    zoomOut: function zoomOut(calnom){
        gantt.config.columns[calnom].width += 10;
        gantt.render();
    },
    
    zoomIn: function zoomIn(calnom){
        gantt.config.columns[calnom].width -= 10;
        gantt.render();    
    },
    
    
    }
// Colmun Zoom "End"





var layoutFunctions = {

    minimizeScreen :  function zoomIn(){

        document.body.style.zoom = "80%";
            },

    maximizeScreen :  function zoomOut (){
        document.body.style.zoom = "120%";
    },
    normalScreen :  function normal (){
        document.body.style.zoom = "99.9%";
    },
    changeVisibleDate : function changeVisibleDate (){
        const start_date_el = document.querySelector(".start_date");
        const end_date_el = document.querySelector(".end_date");
        const start_date = new Date(start_date_el.value);
        const end_date = new Date(end_date_el.value);
    
        if (!+start_date || !+end_date){
            return
          }
          
          gantt.config.start_date = start_date;
          gantt.config.end_date = end_date;
          gantt.render()

    },

    openfullscreen :  function openfullscreen(){
        gantt.plugins({fullscreen: true});
        gantt.expand();
    },

    closefullscreen :  function closefullscreen(){
        gantt.plugins({fullscreen: true});
        gantt.collapse();
    },
    

};




// Intialize and Load Data from Firebase "Start" 
function initializeAndLoadDataFromFirebase(){

	//Declare the data object of the firebase.
	var data = new Firebase("https://ecwnmo-default-rtdb.firebaseio.com");
	//Load data from first collections.(Parse)
	gantt.firebase({tasks: data.child("tasks"), links: data.child("links")});

};
// Intialize and Load Data from Firebase "End" 




 //This function deletes the children of a task before it deletes 
 function deleteChildren () {

    gantt.batchUpdate(function () {
        gantt.eachSelectedTask(function(task_id){
            if(gantt.isTaskExists(task_id))
                gantt.deleteTask(task_id);
        });
    });
};



function templatevalue () {
  
    //gantt.batchUpdate(function () {
         





    //})


    //gantt.eachTask(function(task){
        
        //gantt.updateTask(task.id)
      //});

}; 







// Events such things like saving wbs and sort and color the tasks based in status "Start"
function otherGanttFuncions(){

//Getting the WBS Code
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
     
    task.WBS_Code = gantt.getWBSCode(task);
    return true;
  }); 
  
  
  

  
  gantt.attachEvent("onRowDragEnd", function (id, target) {
        
    //update the order of tasks
    resort();
  
  
  });
  
  
  gantt.attachEvent("onAfterTaskDelete", function(id,task){
    
    resort();



  });
  
  
  gantt.attachEvent("onLightboxSave", function(id, task, is_new){
      //any custom logic here
      resort();
      return true;
  })
  



 
  //Resort the sort_order properity for all tasks and called as function inside gantt.attachEvent functions
  function resort (id, target) {
  
      gantt.batchUpdate(function () {
            var index = 1;
        gantt.eachTask(function(task){
        task.sort_order = index++;
        gantt.updateTask(task.id)
      });
      })
  
  };   

}
// Things like saving wbs and sort and color the tasks based in status "End"








//DatePicker Iquery Config for normal start and end dates and for implemented start and end dates "Start"
function datePickerConfigDates (){


    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.date_grid = "%Y-%m-%d %H:%i";
    gantt.config.work_time = true;
    
    //gantt.attachEvent("onTaskLoading", function (task) {
        //task.implemented_start = gantt.date.parseDate(task.implemented_start, "xml");
        //task.implemented_end = gantt.date.parseDate(task.implemented_end, "xml");
        //return true;
        //});
        


    // creating config of custom editor Start & Implemented Start Dates 
    gantt.config.editor_types.jDateTimePickerS = {
        show: function (id, column, config, placeholder) {
            placeholder.innerHTML = "<div><input type='text' id='datetimepicker' name='" + column.name + "'></div>";
                $("#datetimepicker").datetimepicker(
                {
                      format:'Y.m.d H:i',
              allowTimes:[
      '00:00'
     ],
                      // could also use onSelectDate
                    onSelectTime:function(dateStr){
                        gantt.ext.inlineEditors.save()
                    }
                });
        },
        hide: function (node) {
            $("#datetimepicker").datetimepicker( "destroy" );
            
        },
        
        set_value: function (value, id, column, node) {
            $("#datetimepicker").datetimepicker("setDate", value);
        },
        // tricky way to get imput value and convert it to date type(could be improved)
        get_value: function (id, column, node) {
            return new Date($("#datetimepicker").datetimepicker("getDate")[0].value);
        },
        // base check to avoid empty date 
        is_changed: function (value, id, column, node) {
            let newDate = new Date($("#datetimepicker").datetimepicker("getDate")[0].value);
            if(+newDate)
              return true;
            else
              return false;
        },
        is_valid: function (value, id, column, node) {
            return true;
        },
        save: function (id, column, node) {
        },
        focus: function (node) {
        }
    };
    
    
    
    // creating config of custom editor Start & Implemented Start Dates
    gantt.config.editor_types.jDateTimePickerE = {
        show: function (id, column, config, placeholder) {
            placeholder.innerHTML = "<div><input type='text' id='datetimepicker' name='" + column.name + "'></div>";
                $("#datetimepicker").datetimepicker(
                {
                      format:'Y.m.d H:i',
              allowTimes:[
       '23:01'
     ],
                      // could also use onSelectDate
                    onSelectTime:function(dateStr){
                        gantt.ext.inlineEditors.save()
                    }
                });
        },
        hide: function (node) {
            $("#datetimepicker").datetimepicker( "destroy" );
            
        },
        
        set_value: function (value, id, column, node) {
            $("#datetimepicker").datetimepicker("setDate", value);
        },
        // tricky way to get imput value and convert it to date type(could be improved)
        get_value: function (id, column, node) {
            return new Date($("#datetimepicker").datetimepicker("getDate")[0].value);
        },
        // base check to avoid empty date 
        is_changed: function (value, id, column, node) {
            let newDate = new Date($("#datetimepicker").datetimepicker("getDate")[0].value);
            if(+newDate)
              return true;
            else
              return false;
        },
        is_valid: function (value, id, column, node) {
            return true;
        },
        save: function (id, column, node) {
        },
        focus: function (node) {
        }
    };
    
   

    
        
    


};
//DatePicker Iquery Config for normal start and end dates and for implemented start and end dates "End"


// Show Implmented Date in Timeline "Start"   
function showImplementedDate (){ 
    
    gantt.config.bar_height = 16;
    gantt.config.row_height = 40;

    
    gantt.templates.timeline_cell_class = function(task, date){
        if(task.implemented_start && task.implemented_end){
            if(date >= task.implemented_start && date <= task.implemented_end){
                return "baseline_cell";
            }
        }
        return "";
    };

    

  
    gantt.templates.timeline_cell_content = function(task, date){
        if(task.implemented_start && task.implemented_end){
            if(date >= task.implemented_start && date <= task.implemented_end){
                return "<div class='baseline_cell_content'></div>";
            }
        }
        return "";
    };

};
// Show Implmented Date in Timeline "End"   


