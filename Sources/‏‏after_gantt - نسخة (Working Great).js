//Dropdown Menu Slection for Status and priority "Start"
gantt.serverList("status", [
    { key: "Not Started", label: "Not Started"},
    { key: "In Progress", label: "In Progress"},
    { key: "Done", label: "Done"},
    { key: "Canceled", label: "Canceled"}
]);

gantt.serverList("priority", [
    { key: "High", label: "High"},
    { key: "Mid", label: "Mid"},
    { key: "Low", label: "Low"},
]);


gantt.serverList("gathering_status", [
    { key: "Not Started", label: "Not Started"},
    { key: "In Progress", label: "In Progress"},
    { key: "Done", label: "Done"},
]);

gantt.serverList("archeived_status", [
    { key: "Not Started", label: "Not Started"},
    { key: "In Progress", label: "In Progress"},
    { key: "Done", label: "Done"},
]);

gantt.serverList("implmentaion_status", [
    { key: "Not Started", label: "Not Started"},
    { key: "In Progress", label: "In Progress"},
    { key: "Done", label: "Done"},
    { key: "Canceled", label: "Canceled"},
    { key: "Failed", label: "Failed"}
]);

gantt.serverList("PR_Status", [
    { key: "Not Started", label: "Not Started"},
    { key: "Prepared", label: "Prepared"},
    { key: "Submited", label: "Submited"},
    { key: "Canceled", label: "Canceled"},
]);

gantt.serverList("PO_Status", [
    { key: "Not Started", label: "Not Started"},
    { key: "Paid/Deleivered", label: "Paid/Deleivered"},
    { key: "Archeived/Done", label: "Archeived/Done"},
    { key: "Canceled", label: "Canceled"},
]);



gantt.serverList("indictor_status_options", [
    { key: "Not Started", label: "Not Started"},
    { key: "In Progress", label: "In Progress"},
    { key: "Archeived", label: "Archeived"}
]);


gantt.serverList("Budget_Item_Status", [
    { key: "Yes", label: "Yes"},
    { key: "No But Included", label: "No But Included"},
]);


//Dropdown Menu Slection for Status and priority"End"

//Progree transformation to 0 to 1 value "Start"
gantt.ext.inlineEditors.attachEvent("onBeforeSave", function (state) {
    if (state.columnName == "progress") {
        state.newValue /= 100;
    }
    return true;
});

gantt.ext.inlineEditors.attachEvent("onEditStart", function (state) {
    if (state.columnName == "progress") {
        const node = gantt.ext.inlineEditors._placeholder.firstChild.firstChild
        node.value = parseInt(node.value * 100);
    }
});


//Progree transformation to 0 to 1 value "End"


//The colmun editors Start
let inlineEditors = gantt.ext.inlineEditors;
var allcomlunstypeseditors = {

    
    //const checkboxEditor = { type: "checkbox_editor", map_to: "checkbox" };
    checkbox: checkboxEditor = { type: "number", map_to: "checkbox" },
    startdate: start_dateEditor = { type: "date", map_to: "start_date" },
    duration: durationEditor = { type: "number", map_to: "duration"},
    task: textEditor = { type: "text", map_to: "text" },
    enddate: end_dateEditor = { type: "date", map_to: "end_date" },
    progress: progressEditor = { type: "number", map_to: "progress", min: 0, max: 100 },
    priority: priorityEditor = { type: "select", map_to: "priority" , options: gantt.serverList("priority")},       
    status: statusEditor =  { type: "select", map_to: "status", options: gantt.serverList("status") },

//Main Start    
    wbscode: WBSEditor = { type: "number", map_to: "WBS_Code" },
    sortorder: sort_Editor = { type: "number", map_to: "sort_order" },
    id: idEditor = { type: "text", map_to: "id" },
    type: typeEditor = { type: "text", map_to: "type" },
    publiccomments: publicCommentsEditor = { type: "text", map_to: "public_comments" },
    privatecomments: privateCommentsEditor = { type: "text", map_to: "private_comments" },
    notes: notesEditor = { type: "text", map_to: "notes" },    
    open: openEditor = { type: "text", map_to: "open" },
    taskid: task_idEditor = { type: "text", map_to: "task_id" },
    parent: parentEditor = { type: "text", map_to: "parent" },   
    startdatepicker: startDateEditor = { type: "jDateTimePickerS", map_to: "start_date" },
    enddatepicker: endDateEditor = { type: "jDateTimePickerE", map_to: "end_date" },
//Main End




//Performance Start
    implemented_start: startImplmentedDateEditor = { type: "jDateTimePickerS", map_to: "implemented_start" },
    implemented_end: endImplmentedDateEditor = { type: "jDateTimePickerE", map_to: "implemented_end" },
    implmentaion_status: implmentaion_statusEditor = { type: "select", map_to: "implmentaion_status", options: gantt.serverList("implmentaion_status") },
    workers: workersEditor = { type: "text", map_to: "workers" },
    challenges: challengesEditor = { type: "text", map_to: "challenges" },
    remarkable: remarkableEditor = { type: "text", map_to: "remarkable" },
    implmentation_notes: implmentation_notesEditor = { type: "text", map_to: "implmentation_notes" },
    label: labelEditor = { type: "text", map_to: "label" },
//Performance End





//Documentation Start
    required_files: required_filesEditor = { type: "text", map_to: "required_files" },
    gathering_status: gathering_statusEditor = { type: "select", map_to: "gathering_status", options: gantt.serverList("gathering_status") },
    ungathered_documents: ungathered_documentsEditor = { type: "text", map_to: "ungathered_documents" },
    archeived_status: archeived_statusEditor = { type: "select", map_to: "archeived_status", options: gantt.serverList("archeived_status") },
    documents_paths: documents_pathsEditor = { type: "text", map_to: "documents_paths" },
    documentation_notes: documentation_notesEditor = { type: "text", map_to: "documentation_notes" },
//Documentation End




//Finance Start
    Budget_Item_StatusEditor : Budget_Item_StatusEditor = { type: "select", map_to: "Budget_Item_Status",options: gantt.serverList("Budget_Item_Status") },
    Total_Allocated_Budget_ItemEditor: Total_Allocated_Budget_ItemEditor = { type: "number", map_to: "Total_Allocated_Budget_Item" },   
    Fin_CodeEditor: Fin_CodeEditor = { type: "text", map_to: "Fin_Code" },
    Item_NameEditor: Item_NameEditor = { type: "text", map_to: "Item_Name" },
    Budget_Item_NameEditor: Budget_Item_NameEditor = { type: "text", map_to: "Budget_Item_Name" },

    Cost_DollarEditor: Cost_DollarEditor = { type: "number", map_to: "Cost_Dollar" },
    Cost_YemeniEditor: Cost_YemeniEditor = { type: "number", map_to: "Cost_Yemeni" },

    Fin_Log_DescriptionEditor: Fin_Log_DescriptionEditor = { type: "text", map_to: "Fin_Log_Description" },

    PR_StatusEditor: PR_StatusEditor = { type: "select", map_to: "PR_Status",options: gantt.serverList("PR_Status") },
    PR_DateEditor: PR_DateEditor = { type: "jDateTimePickerS", map_to: "PR_Date" },

    PO_StatusEditor:PO_StatusEditor = { type: "select", map_to: "PO_Status", options: gantt.serverList("PO_Status")  },
    PO_DateEditor: PO_DateEditor = { type: "jDateTimePickerS", map_to: "PO_Date" },

    Parent_ItemEditor: Parent_ItemEditor = { type: "text", map_to: "Parent_Item" },

    Allocated_budgetEditor : Allocated_budgetEditor = { type: "number", map_to: "Allocated_budget" },
    SpentEditor: SpentEditor = { type: "number", map_to: "Spent" },
    The_BalanceEditor: The_BalanceEditor = { type: "number", map_to: "The_Balance" },

    PrecentageEditor: PrecentageEditor = { type: "number", map_to: "Precentage" },

    Changes_in_BudgetEditor: Changes_in_BudgetEditor = { type: "text", map_to: "Changes_in_Budget" },

    Jan_FCEditor: Jan_FCEditor = { type: "number", map_to: "Jan_FC" },
    Feb_FCEditor: Feb_FCEditor = { type: "number", map_to: "Feb_FC" },
    Mar_FCEditor: Mar_FCEditor = { type: "number", map_to: "Mar_FC" },
    Apr_FCEditor: Apr_FCEditor = { type: "number", map_to: "Apr_FC" },
    May_FCEditor: May_FCEditor = { type: "number", map_to: "May_FC" },
    Jun_FCEditor: Jun_FCEditor = { type: "number", map_to: "Jun_FC" },
    Jul_FCEditor: Jul_FCEditor = { type: "number", map_to: "Jul_FC" },
    Aug_FCEditor: Aug_FCEditor = { type: "number", map_to: "Aug_FC" },
    Sep_FCEditor: Sep_FCEditor = { type: "number", map_to: "Sep_FC" },
    Oct_FCEditor: Oct_FCEditor = { type: "number", map_to: "Oct_FC" },
    Nov_FCEditor: Nov_FCEditor = { type: "number", map_to: "Nov_FC" },
    Dec_FCEditor: Dec_FCEditor = { type: "number", map_to: "Dec_FC" },
    TotalEditor: TotalEditor = { type: "number", map_to: "Total" },
    final_remainingEditor: final_remainingEditor = { type: "number", map_to: "final_remaining" },

    Fin_NotesEditor: Fin_NotesEditor = { type: "text", map_to: "Fin_Notes" },
//Finance End



//MEAL Start
    MEAL_CodeEditor: MEAL_CodeEditor = { type: "text", map_to: "MEAL_Code" },
    IndicatorEditor: IndicatorEditor = { type: "text", map_to: "Indicator" },
    Indictor_StatusEditor: Indictor_StatusEditor = { type: "select", map_to: "Indictor_Status", options: gantt.serverList("indictor_status_options") }, // Assuming serverList for options
    Indicator_DefinitionEditor: Indicator_DefinitionEditor = { type: "text", map_to: "Indicator_Definition" },
    Unit_of_measurementEditor: Unit_of_measurementEditor = { type: "text", map_to: "Unit_of_measurement" },
    DisaggregaationEditor: DisaggregaationEditor = { type: "text", map_to: "Disaggregaation" },
    AchievedEditor: AchievedEditor = { type: "text", map_to: "Achieved" }, // Type was specified as Text in the latest request
    Reporting_Date_StartEditor: Reporting_Date_StartEditor = { type: "jDateTimePickerS", map_to: "Reporting_Date_Start" }, // Using jDateTimePickerS as per previous examples - adjust if needed
    Reporting_Date_EndEditor: Reporting_Date_EndEditor = { type: "jDateTimePickerE", map_to: "Reporting_Date_End" }, // Using jDateTimePickerE as per previous examples - adjust if needed
    Period_TargetEditor: Period_TargetEditor = { type: "number", map_to: "Period_Target" },
    Period_ActualEditor: Period_ActualEditor = { type: "number", map_to: "Period_Actual" },
    Period_Percentage_of_TargetEditor: Period_Percentage_of_TargetEditor = { type: "number", map_to: "Period_Precentage_of_Target", min: 0, max: 100 }, // Assuming percentage is between 0 and 100
    data_collection_methodsEditor: data_collection_methodsEditor = { type: "text", map_to: "data_collection_methods" },
    Responsible_of_data_collectionEditor: Responsible_of_data_collectionEditor = { type: "text", map_to: "Responsible_of_data_collection" },
    Name_of_data_collection_toolEditor: Name_of_data_collection_toolEditor = { type: "text", map_to: "Name_of_data_collection_tool" },
    Responsible_of_data_entryEditor: Responsible_of_data_entryEditor = { type: "text", map_to: "Responsible_of_data_entry" },
    Responsible_of__AnalysisEditor: Responsible_of__AnalysisEditor = { type: "text", map_to: "Responsible_of_ Analysis" }, // Corrected column name as per latest request
    Frequency_of_reportingEditor: Frequency_of_reportingEditor = { type: "text", map_to: "Frequency_of_reporting" },
    Means_of_VerificationEditor: Means_of_VerificationEditor = { type: "text", map_to: "Means_of_Verification" },
  

//MEAL End







};
//The colmun editors End





//The colmun editors Start
var colmunsdeclaration = {


    // wbs: wbs = { name: "wbs", label: "WBS", width: 35, resize: true, template: gantt.getWBSCode },

    wbs: wbs = { name: "wbs", label: "WBS", resize: true, template: gantt.getWBSCode },

    wbs_code: wbs_code = { name: "WBS_Code", label: "WBS Code", align: "center", width: 100, resize: true, editor: WBSEditor,hide: true },

    open: open_string = { name: "open",label: "open", width: 50, resize: true, hide:true},

    id: id = { name: "id", tree: true, width: 200, resize: true, editor: idEditor, hide : true},

    taskid: task_id =  { name: "task_id",label: "Task_id", width: 50, resize: true, editor: task_idEditor,hide:true},

    parent: parent =  { name: "parent",label: "Parent", width: 50, resize: true, hide:true}, 

    sortorder: sortorder = { name: "sort_order", label: "Sort Order", align: "center", width: 100, resize: true,hide: true, editor: sort_Editor, template:function(task){
        if(task.sort_order === undefined){
        resort();
        }
        return task.sort_order
        }, },

    task: task = { name: "text", tree: true, width: 200, resize: true, editor: textEditor },


    type: type = { name: "type", tree: true, width: 200, resize: true, editor: typeEditor, hide : true},


    priority: priority = { name: "priority", label: "Priority", width: 40, editor: priorityEditor, resize: true, hide: false },
    
    
    progress: progress = { name: "progress", label: "Progress", align: "center", width: 40, resize: true, editor: progressEditor, hide: false, template: function (task) {
        return Math.round(task.progress * 100) + "%"
        }
    },


    status: status = { name: "status", label: "Status", width: 60, editor: statusEditor, resize: true, hide: false , template:function(task){
        if(task.status === undefined){
          task.status = " ";
        }
        return task.status
        },
    },
    
    
    startdate: startDate = { name: "start_date", label: "Start",align: "center", width: 105, resize: true, editor: startDateEditor },


    enddate: endDate = { name: "end_date", label: "End", align: "center", width: 105, resize: true, editor: endDateEditor },


    duration: duration = {name:"duration",   label:"Duration", width: 30,   align: "center" },


    publiccomments: publicComments = { name: "public_comments",label: "Public Comments", width: 50, resize: true, editor: publicCommentsEditor, template:function(task){
        if(task.public_comments === undefined){
          task.public_comments = " ";            
        }
        return task.public_comments; 
    },},
    

    privatecomments: privateComments = { name: "private_comments",label: "Private Comments", width: 50, resize: true, editor: privateCommentsEditor, template:function(task){
        if(task.private_comments === undefined){
          task.private_comments = " ";
        }
        return task.private_comments;
    },},

          
    notes: notes = { name: "notes",label: "Notes", width: 50, resize: true, editor: notesEditor, template:function(task){
        if(task.notes === undefined){
          task.notes = " ";
        }
        return task.notes;
        
    },},







    
//Performance Start
    implemented_start: implemented_start = { name: "implemented_start", label: "IMPL Start",align: "center", width: 100, resize: true, editor: startImplmentedDateEditor, template:function(task){
        if(task.implemented_start)
        return gantt.date.date_to_str(gantt.config.date_format)(new Date(+task.implemented_start))
    }},


    implemented_end: implemented_end = { name: "implemented_end", label: "IMPL End", align: "center", width: 100, resize: true, editor: endImplmentedDateEditor, template:function(task){
        if(task.implemented_end)
        return gantt.date.date_to_str(gantt.config.date_format)(new Date(+task.implemented_end))
    }},


    implmentaion_status : implmentaion_status = { name: "implmentaion_status",label: "IMPL Status", width: 100, resize: true, editor: implmentaion_statusEditor, template:function(task){
    
        if(task.implmentaion_status === undefined){
          task.implmentaion_status = " ";
        }
        return task.implmentaion_status}},


    workers: workers = { name: "workers", label: "Workers", align: "center", width: 100, resize: true, editor: workersEditor, template:function(task){
    
        if(task.workers === undefined){
          task.workers = " ";
        }
        return task.workers}},

    challenges : challenges = { name: "challenges",label: "Challenges", resize: true, width: 200, editor: challengesEditor, template:function(task){
    
        if(task.challenges === undefined){
          task.challenges = " ";
        }
        return task.challenges}},


    remarkable: remarkable = { name: "remarkable",label: "Remarkable",  resize: true, width: 100, editor: remarkableEditor, template:function(task){
    
        if(task.remarkable === undefined){
          task.remarkable = " ";
        }
        return task.remarkable}},


    implmentation_notes: implmentation_notes = { name: "implmentation_notes",label: "Impl Notes", width: 200, resize: true, editor: implmentation_notesEditor, template:function(task){
    
        if(task.implmentation_notes === undefined){
          task.implmentation_notes = " ";
        }
        return task.implmentation_notes}},

    label: label = { name: "label",label: "Labels",  resize: true, editor: labelEditor, width: 200, template:function(task){
    
        if(task.label === undefined){
          task.label = " ";
        }
        return task.label}},    
//Performance End    













//Documentation Start
    required_files : required_files = { name: "required_files",label: "Required Docs", width: 200, resize: true, editor: required_filesEditor, template:function(task){
        if(task.required_files === undefined){
          task.required_files = " ";
        }
        return task.required_files;
        
    },},



    gathering_status : gathering_status = { name: "gathering_status",label: "Gathering status", width: 100, hide: false, editor: gathering_statusEditor, template:function(task){
        if(task.gathering_status === undefined){
          task.gathering_status = " ";
        }
        return task.gathering_status;
        
    },},


    ungathered_documents : ungathered_documents = { name: "ungathered_documents",label: "Ungathered Docs", width: 100, resize: true, editor: ungathered_documentsEditor, template:function(task){
        if(task.ungathered_documents === undefined){
          task.ungathered_documents = " ";
        }
        return task.ungathered_documents;
        
    },},



    archeived_status: archeived_status = { name: "archeived_status",label: "Archeived Status", width: 100, resize: true, editor: archeived_statusEditor, template:function(task){
        if(task.archeived_status === undefined){
          task.archeived_status = " ";
        }
        return task.archeived_status;
        
    },},


    documents_paths: documents_paths = { name: "documents_paths",label: "Docs Paths", width: 100, resize: true, editor: documents_pathsEditor, template:function(task){
        if(task.documents_paths === undefined){
          task.documents_paths = " ";
        }
        return task.documents_paths;
        
    },},


    documentation_notes: documentation_notes = { name: "documentation_notes",label: "Docs Notes", width: 100, resize: true, editor: documentation_notesEditor, template:function(task){
        if(task.documentation_notes === undefined){
          task.documentation_notes = " ";
        }
        return task.documentation_notes;
        
    },},
// Documentation End



// Finance/Log Start

Total_Allocated_Budget_Item : Total_Allocated_Budget_Item = { name: "Total_Allocated_Budget_Item",label: "Total Allocated Budget Item",align: "center", width: 100, resize: true, editor: Total_Allocated_Budget_ItemEditor, template:function(task){
            if(task.Total_Allocated_Budget_Item === undefined){
            task.Total_Allocated_Budget_Item = 0;
            }
            return task.Total_Allocated_Budget_Item + " $";

        },}, 

        Budget_Item_Status : Budget_Item_Status = { name: "Budget_Item_Status",label: "Is Budget", width: 100, align: "center",resize: true, editor: Budget_Item_StatusEditor, template:function(task){
            if(task.Budget_Item_Status === undefined){
            task.Budget_Item_Status = " ";
            }
            return task.Budget_Item_Status;

        },},

        Fin_Code : Fin_Code = { name: "Fin_Code",label: "Fin Code", align: "center", width: 100, resize: true, editor: Fin_CodeEditor, template:function(task){
            if(task.Fin_Code === undefined){
            task.Fin_Code = " ";
            }
            return task.Fin_Code;

        },},

        Item_Name : Item_Name = { name: "Item_Name",label: "Item Name", width: 200, resize: true, editor: Item_NameEditor, template:function(task){
            if(task.Item_Name === undefined){
            task.Item_Name = " ";
            }
            return task.Item_Name;

        },},
        Budget_Item_Name : Budget_Item_Name = { name: "Budget_Item_Name",label: "Budget Item Name", width: 200, resize: true, editor: Budget_Item_NameEditor, template:function(task){
            if(task.Budget_Item_Name === undefined){
            task.Budget_Item_Name = " ";
            }
            return task.Budget_Item_Name;

        },},

        Cost_Dollar : Cost_Dollar = { name: "Cost_Dollar",label: "Cost Dollar",editable: false, align: "center",width: 100, resize: true, editor: Cost_DollarEditor, template:function(task){
            if(task.Cost_Dollar === undefined){
            task.Cost_Dollar = 0;
            }
            return task.Cost_Dollar +" $";

        },},

        Cost_Yemeni : Cost_Yemeni = { name: "Cost_Yemeni",label: "Cost Yemeni",align: "center", width: 100, resize: true, editor: Cost_YemeniEditor, template:function(task){
            if(task.Cost_Yemeni === undefined){
            task.Cost_Yemeni = 0;
            }
            return task.Cost_Yemeni + " YR";

        },},

        Fin_Log_Description : Fin_Log_Description = { name: "Fin_Log_Description",label: "Fin Log Description", width: 200, resize: true, editor: Fin_Log_DescriptionEditor, template:function(task){
            if(task.Fin_Log_Description === undefined){
            task.Fin_Log_Description = " ";
            }
            return task.Fin_Log_Description;

        },},

        PR_Status : PR_Status = { name: "PR_Status",label: "PR Status", width: 100, align: "center",resize: true, editor: PR_StatusEditor, template:function(task){
            if(task.PR_Status === undefined){
            task.PR_Status = " ";
            }
            return task.PR_Status;

        },},

        PR_Date : PR_Date = { name: "PR_Date", label: "PR Date", align: "center", width: 110, resize: true, editor: PR_DateEditor, template:function(task){
            if(task.PR_Date)
            return gantt.date.date_to_str(gantt.config.date_format)(new Date(+task.PR_Date))
        }},

        PO_Status : PO_Status = { name: "PO_Status",label: "PO Status", width: 100, resize: true, editor: PO_StatusEditor, template:function(task){
            if(task.PO_Status === undefined){
            task.PO_Status = " ";
            }
            return task.PO_Status;

        },},

        PO_Date : PO_Date = { name: "PO_Date", label: "PO Date", align: "center", width: 110, resize: true, editor: PO_DateEditor, template:function(task){
            if(task.PO_Date)
            return gantt.date.date_to_str(gantt.config.date_format)(new Date(+task.PO_Date))
        }},


        Parent_Item : Parent_Item = { name: "Parent_Item",label: "Parent Item", width: 100, resize: true, editor: Parent_ItemEditor, template:function(task){
            if(task.Parent_Item === undefined){
            task.Parent_Item = " ";
            }
            return task.Parent_Item;

        },},

        Allocated_budget : Allocated_budget = { name: "Allocated_budget",label: "Allocated Budget",align: "center", width: 100, resize: true, editor: Allocated_budgetEditor, template:function(task){
            if(task.Allocated_budget === undefined){
            task.Allocated_budget = 0;
            }
            return task.Allocated_budget + " $";

        },},

        Spent : Spent = { name: "Spent",label: "Spent",align: "center", width: 100, resize: true, editor: SpentEditor, template:function(task){
            if(task.Spent === undefined){
            task.Spent = 0;
            }
            return task.Spent  + " $";

        },},

        The_Balance : The_Balance = { name: "The_Balance",label: "The Balance",  align: "center", width: 100, resize: true, editor: The_BalanceEditor, template:function(task){
            if(task.The_Balance === undefined){
            task.The_Balance = " ";
            }return +task.Allocated_budget - +task.Spent + " $";

        },},

        Precentage : Precentage = { name: "Precentage",label: "Precentage",  align: "center", width: 100, resize: true, editor: PrecentageEditor, template:function(task){
            if((+task.Spent / +task.Allocated_budget) * 100 === Infinity){
            return "Over Spent";}
            if(isNaN((+task.Spent / +task.Allocated_budget) * 100)){
                return " ";
            } 
            return (+task.Spent / +task.Allocated_budget) * 100 + "%";
            
        },},

        Changes_in_Budget : Changes_in_Budget = { name: "Changes_in_Budget",label: "Changes In Budget", width: 100, resize: true, editor: Changes_in_BudgetEditor, template:function(task){
            if(task.Changes_in_Budget === undefined){
            task.Changes_in_Budget = " ";
            }
            return task.Changes_in_Budget;

        },},

        Jan_FC : Jan_FC = { name: "Jan_FC",label: "Jan FC", width: 50, resize: true, editor: Jan_FCEditor, template:function(task){
            if(task.Jan_FC === undefined){
            task.Jan_FC = 0;
            }
            return task.Jan_FC;

        },},

        Feb_FC : Feb_FC = { name: "Feb_FC",label: "Feb FC", width: 50, resize: true, editor: Feb_FCEditor, template:function(task){
            if(task.Feb_FC === undefined){
            task.Feb_FC = 0;
            }
            return task.Feb_FC;

        },},

        Mar_FC : Mar_FC = { name: "Mar_FC",label: "Mar FC", width: 50, resize: true, editor: Mar_FCEditor, template:function(task){
            if(task.Mar_FC === undefined){
            task.Mar_FC = 0;
            }
            return task.Mar_FC;

        },},

        Apr_FC : Apr_FC = { name: "Apr_FC",label: "Apr FC", width: 50, resize: true, editor: Apr_FCEditor, template:function(task){
            if(task.Apr_FC === undefined){
            task.Apr_FC = 0;
            }
            return task.Apr_FC;

        },},

        May_FC : May_FC = { name: "May_FC",label: "May FC", width: 50, resize: true, editor: May_FCEditor, template:function(task){
            if(task.May_FC === undefined){
            task.May_FC = 0;
            }
            return task.May_FC;

        },},

        Jun_FC : Jun_FC = { name: "Jun_FC",label: "Jun FC", width: 50, resize: true, editor: Jun_FCEditor, template:function(task){
            if(task.Jun_FC === undefined){
            task.Jun_FC = 0;
            }
            return task.Jun_FC;

        },},

        Jul_FC : Jul_FC = { name: "Jul_FC",label: "Jul FC", width: 50, resize: true, editor: Jul_FCEditor, template:function(task){
            if(task.Jul_FC === undefined){
            task.Jul_FC = 0;
            }
            return task.Jul_FC;

        },},

        Aug_FC : Aug_FC = { name: "Aug_FC",label: "Aug FC", width: 50, resize: true, editor: Aug_FCEditor, template:function(task){
            if(task.Aug_FC === undefined){
            task.Aug_FC = 0;
            }
            return task.Aug_FC;

        },},

        Sep_FC : Sep_FC = { name: "Sep_FC",label: "Sep FC", width: 50, resize: true, editor: Sep_FCEditor, template:function(task){
            if(task.Sep_FC === undefined){
            task.Sep_FC = 0;
            }
            return task.Sep_FC;

        },},

        Oct_FC : Oct_FC = { name: "Oct_FC",label: "Oct FC", width: 50, resize: true, editor: Oct_FCEditor, template:function(task){
            if(task.Oct_FC === undefined){
            task.Oct_FC = 0;
            }
            return task.Oct_FC;

        },},

        Nov_FC : Nov_FC = { name: "Nov_FC",label: "Nov FC", width: 50, resize: true, editor: Nov_FCEditor, template:function(task){
            if(task.Nov_FC === undefined){
            task.Nov_FC = 0;
            }
            return task.Nov_FC;

        },},

        Dec_FC : Dec_FC = { name: "Dec_FC",label: "Dec FC", width: 50, resize: true, editor: Dec_FCEditor, template:function(task){
            if(task.Dec_FC === undefined){
            task.Dec_FC = 0;
            }
            return task.Dec_FC;

        },},

        Total : Total = { name: "Total",label: "Total", width: 50, resize: true, editor: TotalEditor, template:function(task){
            if(task.Total === undefined){
            task.Total = " ";
            }
            return +task.Jan_FC + +task.Feb_FC + +task.Mar_FC + +task.Apr_FC + +task.May_FC + +task.Jun_FC + +task.Jul_FC + +task.Aug_FC + +task.Sep_FC + +task.Oct_FC + +task.Nov_FC + +task.Dec_FC + "$"

        },},

        final_remaining : final_remaining = { name: "final_remaining",label: "Remaining After FC", width: 120, resize: true, editor: final_remainingEditor, template:function(task){
            if(task.final_remaining === undefined){
            task.final_remaining = " ";
            }
            return +task.Allocated_budget - (+task.Jan_FC + +task.Feb_FC + +task.Mar_FC + +task.Apr_FC + +task.May_FC + +task.Jun_FC + +task.Jul_FC + +task.Aug_FC + +task.Sep_FC + +task.Oct_FC + +task.Nov_FC + +task.Dec_FC) + "$";

        },},

        Fin_Notes : Fin_Notes = { name: "Fin_Notes",label: "Fin Notes", width: 200, resize: true, editor: Fin_NotesEditor, template:function(task){
            if(task.Fin_Notes === undefined){
            task.Fin_Notes = " ";
            }
            return task.Fin_Notes;

        },},




// Finance/Log End





//MEAL Start

MEAL_Code : MEAL_Code = { name: "MEAL_Code",label: "MEAL Code", width: 100, resize: true, editor: MEAL_CodeEditor, template:function(task){
    if(task.MEAL_Code === undefined){
      task.MEAL_Code = " ";
    }
    return task.MEAL_Code;

},},

Indicator : Indicator = { name: "Indicator",label: "Indicator", width: 200, resize: true, editor: IndicatorEditor, template:function(task){
    if(task.Indicator === undefined){
      task.Indicator = " ";
    }
    return task.Indicator;

},},

Indictor_Status : Indictor_Status = { name: "Indictor_Status",label: "Indictor Status", width: 120,  editor: Indictor_StatusEditor, template:function(task){
    if(task.Indictor_Status === undefined){
      task.Indictor_Status = " ";
    }
    return task.Indictor_Status;

},},

Indicator_Definition : Indicator_Definition = { name: "Indicator_Definition",label: "Indicator Definition", width: 200, resize: true, editor: Indicator_DefinitionEditor, template:function(task){
    if(task.Indicator_Definition === undefined){
      task.Indicator_Definition = " ";
    }
    return task.Indicator_Definition;

},},

Unit_of_measurement : Unit_of_measurement = { name: "Unit_of_measurement",label: "Unit of measurement", width: 150, resize: true, editor: Unit_of_measurementEditor, template:function(task){
    if(task.Unit_of_measurement === undefined){
      task.Unit_of_measurement = " ";
    }
    return task.Unit_of_measurement;

},},

Disaggregaation : Disaggregaation = { name: "Disaggregaation",label: "Disaggregaation", width: 150, resize: true, editor: DisaggregaationEditor, template:function(task){
    if(task.Disaggregaation === undefined){
      task.Disaggregaation = " ";
    }
    return task.Disaggregaation;

},},

Achieved : Achieved = { name: "Achieved",label: "Achieved", width: 100, resize: true, editor: AchievedEditor, template:function(task){
    if(task.Achieved === undefined){
      task.Achieved = " ";
    }
    return task.Achieved;

},},

Reporting_Date_Start : Reporting_Date_Start = { name: "Reporting_Date_Start",label: "Reporting Start Date", width: 120, resize: true, editor: Reporting_Date_StartEditor, template:function(task){
    if(task.Reporting_Date_Start)
    return gantt.date.date_to_str(gantt.config.date_format)(new Date(+task.Reporting_Date_Start))
}},

Reporting_Date_End : Reporting_Date_End = { name: "Reporting_Date_End",label: "Reporting End Date", width: 120, resize: true, editor: Reporting_Date_EndEditor, template:function(task){
    if(task.Reporting_Date_End)
    return gantt.date.date_to_str(gantt.config.date_format)(new Date(+task.Reporting_Date_End))
}},

Period_Target : Period_Target = { name: "Period_Target",label: "Period Target", align: "center", width: 100, resize: true, editor: Period_TargetEditor, template:function(task){
    if(task.Period_Target === undefined){
        task.Period_Target = 0;
    }
    return task.Period_Target;

},},

Period_Actual : Period_Actual = { name: "Period_Actual",label: "Period Actual", align: "center", width: 100, resize: true, editor: Period_ActualEditor, template:function(task){
    if(task.Period_Actual === undefined){
        task.Period_Actual = 0;
    }
    return task.Period_Actual;

},},

Period_Percentage_of_Target : Period_Percentage_of_Target = { name: "Period_Precentage_of_Target", label: "Period % of Target", align: "center", width: 80, resize: true, editor: Period_Percentage_of_TargetEditor, template: function (task) {
    if(task.Period_Percentage_of_Target === undefined){
        task.Period_Percentage_of_Target = 0;
    }
    return Math.round(task.Period_Percentage_of_Target * 100) + "%"
    }
},

data_collection_methods : data_collection_methods = { name: "data_collection_methods",label: "Data Collection Methods", width: 200, resize: true, editor: data_collection_methodsEditor, template:function(task){
    if(task.data_collection_methods === undefined){
      task.data_collection_methods = " ";
    }
    return task.data_collection_methods;

},},

Responsible_of_data_collection : Responsible_of_data_collection = { name: "Responsible_of_data_collection",label: "Responsible of Data Collection", width: 200, resize: true, editor: Responsible_of_data_collectionEditor, template:function(task){
    if(task.Responsible_of_data_collection === undefined){
      task.Responsible_of_data_collection = " ";
    }
    return task.Responsible_of_data_collection;

},},

Name_of_data_collection_tool : Name_of_data_collection_tool = { name: "Name_of_data_collection_tool",label: "Name of data collection tool", width: 200, resize: true, editor: Name_of_data_collection_toolEditor, template:function(task){
    if(task.Name_of_data_collection_tool === undefined){
      task.Name_of_data_collection_tool = " ";
    }
    return task.Name_of_data_collection_tool;

},},

Responsible_of_data_entry : Responsible_of_data_entry = { name: "Responsible_of_data_entry",label: "Responsible of data entry", width: 200, resize: true, editor: Responsible_of_data_entryEditor, template:function(task){
    if(task.Responsible_of_data_entry === undefined){
      task.Responsible_of_data_entry = " ";
    }
    return task.Responsible_of_data_entry;

},},

Responsible_of__Analysis : Responsible_of__Analysis = { name: "Responsible_of_ Analysis",label: "Responsible of  Analysis", width: 200, resize: true, editor: Responsible_of__AnalysisEditor, template:function(task){
    if(task.Responsible_of__Analysis === undefined){
      task.Responsible_of__Analysis = " ";
    }
    return task.Responsible_of__Analysis;

},},

Frequency_of_reporting : Frequency_of_reporting = { name: "Frequency_of_reporting",label: "Frequency of reporting", width: 150, resize: true, editor: Frequency_of_reportingEditor, template:function(task){
    if(task.Frequency_of_reporting === undefined){
      task.Frequency_of_reporting = " ";
    }
    return task.Frequency_of_reporting;

},},

Means_of_Verification : Means_of_Verification = { name: "Means_of_Verification",label: "Means of Verification", width: 200, resize: true, editor: Means_of_VerificationEditor, template:function(task){
    if(task.Means_of_Verification === undefined){
      task.Means_of_Verification = " ";
    }
    return task.Means_of_Verification;

},},



//MEAL End






    add: add = { name: "add", width: 30 },


    duplicate: duplicate =   	{name:"duplicate", label:"Duplicate", width:44, template: function(task){
        return "<input type=button class='btn btn-default btn-light md-control-point-duplicate' value='' onclick=clone_task("+task.id+")>"
    }},

};
//The colmun editors End





//The colmuns in Main Gantt "Start"
function mainganttcolmuns (){
//Declare the colmuns in the gantt
gantt.config.columns = [
    colmunsdeclaration.wbs,
    colmunsdeclaration.wbs_code,
    colmunsdeclaration.open,
    colmunsdeclaration.id,
    colmunsdeclaration.taskid,
    colmunsdeclaration.parent,
    colmunsdeclaration.sortorder,

    colmunsdeclaration.task,
    colmunsdeclaration.type,
    colmunsdeclaration.priority,
    colmunsdeclaration.progress,
    colmunsdeclaration.status,
    colmunsdeclaration.startdate,
    colmunsdeclaration.enddate,
    colmunsdeclaration.duration,
    colmunsdeclaration.publiccomments,
    colmunsdeclaration.privatecomments,
    colmunsdeclaration.notes,

    colmunsdeclaration.add,
    colmunsdeclaration.duplicate,

    ];


};
//The colmuns in Main Gantt "End"


//The colmuns in Documentation Gantt "Start"
function performanceganttcolmuns (){
    //Declare the colmuns in the gantt
    gantt.config.columns = [

    // from 0 to 6
        colmunsdeclaration.wbs,
        colmunsdeclaration.wbs_code,
        colmunsdeclaration.open,
        colmunsdeclaration.id,
        colmunsdeclaration.taskid,
        colmunsdeclaration.parent,
        colmunsdeclaration.sortorder,
    

    // from 7 to 14    
        colmunsdeclaration.task,
        colmunsdeclaration.type,
        colmunsdeclaration.priority,
        colmunsdeclaration.progress,
        colmunsdeclaration.status,
        colmunsdeclaration.startdate,
        colmunsdeclaration.enddate,
        colmunsdeclaration.duration,


    // from 15 to 22     
        colmunsdeclaration.implemented_start,
        colmunsdeclaration.implemented_end,
        colmunsdeclaration.implmentaion_status,
        colmunsdeclaration.implmentation_notes,
        colmunsdeclaration.workers,
        colmunsdeclaration.challenges,
        colmunsdeclaration.remarkable,   
        colmunsdeclaration.label,
  
        ];
    
    
    };
//The colmuns in Documentation Gantt "End"
    
   


//The colmuns in Documentation Gantt "Start"
function documentationganttcolmuns (){
    //Declare the colmuns in the gantt
    gantt.config.columns = [
        colmunsdeclaration.wbs,
        colmunsdeclaration.wbs_code,
        colmunsdeclaration.open,
        colmunsdeclaration.id,
        colmunsdeclaration.taskid,
        colmunsdeclaration.parent,
        colmunsdeclaration.sortorder,
    
        colmunsdeclaration.task,
        colmunsdeclaration.type,
        colmunsdeclaration.status,
        colmunsdeclaration.startdate,
        colmunsdeclaration.enddate,


        colmunsdeclaration.required_files,
        colmunsdeclaration.gathering_status,
        colmunsdeclaration.ungathered_documents,
        colmunsdeclaration.archeived_status,
        colmunsdeclaration.documents_paths,
        colmunsdeclaration.documentation_notes,
    
    
        ];
    
    
    };
//The colmuns in Documentation Gantt "End"
    
    
//The colmuns in Finance Gantt "Start"
function financeganttcolmuns (){
    //Declare the colmuns in the gantt
    gantt.config.columns = [

    //0-6
        colmunsdeclaration.wbs,
        colmunsdeclaration.wbs_code,
        colmunsdeclaration.open,
        colmunsdeclaration.id,
        colmunsdeclaration.taskid,
        colmunsdeclaration.parent,
        colmunsdeclaration.sortorder,
    // 7-11
        colmunsdeclaration.task,
        colmunsdeclaration.type,
        colmunsdeclaration.status,
        colmunsdeclaration.startdate,
        colmunsdeclaration.enddate,

    //12 - 41
        colmunsdeclaration.Budget_Item_Status,
        colmunsdeclaration.Total_Allocated_Budget_Item,
        colmunsdeclaration.Budget_Item_Name,
        colmunsdeclaration.Fin_Code,
        colmunsdeclaration.Item_Name,       
        colmunsdeclaration.Cost_Dollar,
        colmunsdeclaration.Cost_Yemeni,
        colmunsdeclaration.Fin_Log_Description,
        colmunsdeclaration.PR_Status,
        colmunsdeclaration.PR_Date,
        colmunsdeclaration.PO_Status,
        colmunsdeclaration.PO_Date,
        colmunsdeclaration.Parent_Item,
        colmunsdeclaration.Allocated_budget,
        colmunsdeclaration.Spent,
        colmunsdeclaration.The_Balance,
        colmunsdeclaration.Precentage,
        colmunsdeclaration.Changes_in_Budget,
        colmunsdeclaration.Jan_FC,
        colmunsdeclaration.Feb_FC,
        colmunsdeclaration.Mar_FC,
        colmunsdeclaration.Apr_FC,
        colmunsdeclaration.May_FC,
        colmunsdeclaration.Jun_FC,
        colmunsdeclaration.Jul_FC,
        colmunsdeclaration.Aug_FC,
        colmunsdeclaration.Sep_FC,
        colmunsdeclaration.Oct_FC,
        colmunsdeclaration.Nov_FC,
        colmunsdeclaration.Dec_FC,
        colmunsdeclaration.Total,
        colmunsdeclaration.final_remaining,
        colmunsdeclaration.Fin_Notes,


    
    
        ];
    
    
    };
//The colmuns in Finance Gantt "End"



//The colmuns in MEAL Gantt "Start"
function MEALganttcolmuns (){
    //Declare the colmuns in the gantt
    gantt.config.columns = [

    // from 0 to 6
        colmunsdeclaration.wbs,
        colmunsdeclaration.wbs_code,
        colmunsdeclaration.open,
        colmunsdeclaration.id,
        colmunsdeclaration.taskid,
        colmunsdeclaration.parent,
        colmunsdeclaration.sortorder,
    

    // from 7 to 14    
        colmunsdeclaration.task,
        colmunsdeclaration.type,
        colmunsdeclaration.priority,
        colmunsdeclaration.progress,
        colmunsdeclaration.status,
        colmunsdeclaration.startdate,
        colmunsdeclaration.enddate,
        colmunsdeclaration.duration,


    // from 15 to 33     
    colmunsdeclaration.MEAL_Code,
    colmunsdeclaration.Indicator,
    colmunsdeclaration.Indictor_Status,
    colmunsdeclaration.Indicator_Definition,
    colmunsdeclaration.Unit_of_measurement,
    colmunsdeclaration.Disaggregaation,
    colmunsdeclaration.Achieved,
    colmunsdeclaration.Reporting_Date_Start,
    colmunsdeclaration.Reporting_Date_End,
    colmunsdeclaration.Period_Target,
    colmunsdeclaration.Period_Actual,
    colmunsdeclaration.Period_Percentage_of_Target,
    colmunsdeclaration.data_collection_methods,
    colmunsdeclaration.Responsible_of_data_collection,
    colmunsdeclaration.Name_of_data_collection_tool,
    colmunsdeclaration.Responsible_of_data_entry,
    colmunsdeclaration.Responsible_of__Analysis,
    colmunsdeclaration.Frequency_of_reporting,
    colmunsdeclaration.Means_of_Verification,
  
        ];
    
    
    };
//The colmuns in MEAL Gantt "End"







//filters on headers start
    let filter = false;
    let currentFilterBox = null;

    function formatDate(date) {
        return gantt.date.date_to_str("%Y-%m-%d")(date)
    }

    function getRange(type) {
        return gantt.getState()[type] || new Date();
    }

    const columnTypes = {
        number: ["duration", "progress", "Cost_Dollar", "Cost_Yemeni", "Allocated_budget", "Spent", "The_Balance", "Precentage", "Jan_FC", "Feb_FC", "Mar_FC", "Apr_FC", "May_FC", "Jun_FC", "Jul_FC", "Aug_FC", "Sep_FC", "Oct_FC", "Nov_FC", "Dec_FC", "Total", "final_remaining", "Period_Target", "Period_Actual", "Period_Precentage_of_Target"
        ],
        date: ["start_date", "end_date", "implemented_start", "implemented_end", "PR_Date", "PO_Date", "Reporting_Date_Start", "Reporting_Date_End"
        ],
        string: ["text", "type", "priority", "status", "notes", "public_comments", "private_comments", "required_files", "gathering_status", "ungathered_documents", "archeived_status", "documents_paths", "documentation_notes", "implmentaion_status", "workers", "challenges", "remarkable", "implmentation_notes", "label", "Fin_Code", "Item_Name", "Budget_Item_Name", "Fin_Log_Description", "PR_Status", "PO_Status", "Parent_Item", "Changes_in_Budget", "Fin_Notes", "MEAL_Code", "Indicator", "Indictor_Status", "Indicator_Definition", "Unit_of_measurement", "Disaggregaation", "Achieved", "data_collection_methods", "Responsible_of_data_collection", "Name_of_data_collection_tool", "Responsible_of_data_entry", "Responsible_of_ Analysis", "Frequency_of_reporting", "Means_of_Verification"
        ],
        boolean: [],
        ignore: ["add", "duplicate"]
    }

    const filterTypes = {
        number: `
          <div class="filter_element"><label>Min: <input type="number" placeholder="0" min="0" class="filter_min"></label></div>
          <div class="filter_element"><label>Max: <input type="number" placeholder="9999" min="0" class="filter_max"></label></div>
        `,
        string: `
          <div class="filter_element"><label>Match: <input placeholder="type the text here" class="filter_match"></label></div>
        `,
        date: `
          <div class="filter_element"><label>Min: <input type="date" class="filter_range_min"></label></div>
          <div class="filter_element"><label>Max: <input type="date" class="filter_range_max"></label></div>
        `,
    }

    function getFilterBoxType(columnName) {
        if (columnName === 'text') {
            return `
                 <div class="filter_element"><label>Match Task: <input placeholder="type the text here" class="filter_match_with_children"></label></div>
                <div class="filter_element"><label>Match Task Including Children: <input placeholder="type the text here" class="filter_match"></label></div>
               
            `;
        }
        for (let columnType in columnTypes) {
            if (columnTypes[columnType].indexOf(columnName) > -1) {
                return filterTypes[columnType]
            }
        }
    }


    function showFilterBox(columnName, e) {

        const gridColumn = gantt.getGridColumn(columnName);
        const columnLabel = gridColumn.label || gridColumn.name;

        const columnHeaderCell = e.target;
        const coords = columnHeaderCell.getBoundingClientRect();
        const el = document.createElement("div");
        el.className = "filter_box card card-body form-group";
        el.style = `
          left: ${coords.left}px;
          top: ${coords.top + coords.height}px;
        `

        el.innerHTML = `
        <input type="button" value="Hide" class="hide_filter" onclick="hideFilterBox();">
          <div>Filter by <b>${columnLabel}</b>:</div>
          ${getFilterBoxType(columnName)}
          <input type="button" value="Reset" class="remove_filter">
          
        `

        document.body.appendChild(el)

        currentFilterBox = columnName
        restoreFilterValues()
    }

    function restoreFilterValues() {
        const matchFilter = document.querySelector(".filter_match")
        if (matchFilter) {
            matchFilter.value = (filter[currentFilterBox] && filter[currentFilterBox].match) || ""
        }

        const matchWithChildrenFilter = document.querySelector(".filter_match_with_children")
        if (matchWithChildrenFilter) {
            matchWithChildrenFilter.value = (filter[currentFilterBox] && filter[currentFilterBox].matchWithChildren) || ""
        }

        const minFilter = document.querySelector(".filter_min")
        if (minFilter) {
            minFilter.value = (filter[currentFilterBox] && filter[currentFilterBox].min) || ""
        }
        const maxFilter = document.querySelector(".filter_max")
        if (maxFilter) {
            maxFilter.value = (filter[currentFilterBox] && filter[currentFilterBox].max) || ""
        }

        const minRangeFilter = document.querySelector(".filter_range_min")
        if (minRangeFilter) {
            minRangeFilter.value = (filter[currentFilterBox] && filter[currentFilterBox].min) || formatDate(getRange("min_date"))
        }
        const maxRangeFilter = document.querySelector(".filter_range_max")
        if (maxRangeFilter) {
            maxRangeFilter.value = (filter[currentFilterBox] && filter[currentFilterBox].max) || formatDate(getRange("max_date"))
        }
    }

    function changeColumnHighlight() {
        let highlightEl = document.querySelector("#highlight_style")
        if (!highlightEl) {
            highlightEl = document.createElement("style")
            highlightEl.id = "highlight_style"
            document.body.appendChild(highlightEl)
        }
        let styles = "";
        for (const prop in filter) {
            styles += `
                .gantt_grid_head_${prop}{
                    text-decoration: underline;
                    background: snow;
                }
            `
        }
        highlightEl.innerHTML = styles
    }

    gantt.attachEvent("onGridHeaderClick", function (columnName, e) {
        hideFilterBox()
        if (columnTypes.ignore.indexOf(columnName) === -1) {
            showFilterBox(columnName, e)
            //Expand All tasks to filter them as filter only filiter the visible ones Start
            gantt.batchUpdate(function () {
                gantt.eachTask(function (task) {
                    gantt.open(task.id)
                })
            })
            //Expand All tasks to filter them as filter only filiter the visible ones End

        }
        return true;
    });
    gantt.attachEvent("onEmptyClick", function (e) {
        if (!e.target.closest(".gantt_grid_head_cell")) {
            hideFilterBox()
        }
    });

    window.addEventListener("input", function (e) {
        if (e.target.closest(".filter_box")) {
            filter = filter || {};
            filter[currentFilterBox] = filter[currentFilterBox] || {};

            const filterTextEl = e.target.closest(".filter_match");
            const filterWithChildrenEl = e.target.closest(".filter_match_with_children");

            const filterMinEl = e.target.closest(".filter_min");
            const filterMaxEl = e.target.closest(".filter_max");

            const filterMinDateEl = e.target.closest(".filter_range_min");
            const filterMaxDateEl = e.target.closest(".filter_range_max");

            if (filterTextEl) {
                filter[currentFilterBox].match = filterTextEl.value;
                if (filterWithChildrenEl) filterWithChildrenEl.value = "";
                filter[currentFilterBox].matchWithChildren = "";
            }

            if (filterWithChildrenEl) {
                filter[currentFilterBox].matchWithChildren = filterWithChildrenEl.value;
                if (filterTextEl) filterTextEl.value = "";
                filter[currentFilterBox].match = "";
            }

            if (filterMinEl) {
                filter[currentFilterBox].min = filterMinEl.value;
            }
            if (filterMaxEl) {
                filter[currentFilterBox].max = filterMaxEl.value;
            }
            if (filterMinDateEl) {
                filter[currentFilterBox].min = filterMinDateEl.value;
            }
            if (filterMaxDateEl) {
                filter[currentFilterBox].max = filterMaxDateEl.value;
            }
            changeColumnHighlight()

            gantt.render();
        }
    })

    window.addEventListener("click", function (e) {
        if (e.target.closest(".remove_filter")) {
            if (columnTypes.date.indexOf(currentFilterBox) === -1) {
                const inputChildren = document.querySelectorAll("input");
                inputChildren.forEach(function (el) {
                    if (el.className != "remove_filter") {
                        if (el.className != "hide_filter") {
                            el.value = ""
                        }
                    }
                })
            }
            delete filter[currentFilterBox];

            restoreFilterValues()
            changeColumnHighlight()

            gantt.render()
        }
    })

    function hideFilterBox() {
        const filterBox = document.querySelector(".filter_box");
        if (filterBox) {
            filterBox.innerHTML = "";
            filterBox.remove();
        }
    }

    function filterLogic(task) {
        if (!filter) return true;
        for (let prop in filter) {
            const taskProp = task[prop] === undefined ? " " : task[prop];

            if (prop === 'text') {
                const matchValue = filter[prop].match;
                if (matchValue) {
                    let taskToCheck = task;
                    let hasMatch = false;
                    while (taskToCheck) {
                        if (taskToCheck.text && taskToCheck.text.toLowerCase().indexOf(matchValue.toLowerCase()) !== -1) {
                            hasMatch = true;
                            break;
                        }
                        const parentId = gantt.getParent(taskToCheck.id);
                        if (!parentId) break;
                        taskToCheck = gantt.getTask(parentId);
                    }
                    if (!hasMatch) {
                        return false;
                    }
                }

                const matchWithChildrenValue = filter[prop].matchWithChildren;
                if (matchWithChildrenValue) {
                    let found = false;
                    if (taskProp.toLowerCase().indexOf(matchWithChildrenValue.toLowerCase()) > -1) {
                        found = true;
                    } 
                    if (!found) return false;
                }

            } else if (columnTypes.date.indexOf(prop) > -1) {
                const min = filter[prop].min ? new Date(filter[prop].min) : null;
                const max = filter[prop].max ? new Date(filter[prop].max) : null;
                const date = new Date(taskProp)

                if (min && date < min) {
                    return false
                }
                if (max && date > max) {
                    return false
                }

            } else if (columnTypes.number.indexOf(prop) > -1) {
                const min = filter[prop].min;
                const max = filter[prop].max;

                if (min && parseFloat(taskProp) < parseFloat(min)) {
                    return false
                }
                if (max && parseFloat(taskProp) > parseFloat(max)) {
                    return false
                }
            } else {
                if (filter[prop] && filter[prop].match && taskProp.toLowerCase().indexOf(filter[prop].match.toLowerCase()) === -1) {
                    return false
                }
            }
        }
        return true;
    }

    gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {

        return filterLogic(task);
    });
//filters on headers end




//The "start" of firebase Adapter
(function() {

    var gEventsCollection = null,
        gFirebaseListenersCollection = null,
        gDataSnapshots = null;
    
    gantt.firebase = function(dataSnapshots) {
        gDataSnapshots = dataSnapshots;
        gEventsCollection = new DataCollection();
        gFirebaseListenersCollection = new DataCollection();

        initDataSnapshotHandler(this, dataSnapshots["tasks"], "task");
        initDataSnapshotHandler(this, dataSnapshots["links"], "link");

        function initDataSnapshotHandler(gantt, dataSnapshot, itemType) {
            var itemTypeSettings = getItemTypeSettings(gantt, itemType),
                eventsNames = itemTypeSettings.events_names;

            var snapshotHandlerObj = new SnapshotHandler(dataSnapshot);

            gEventsCollection.add(gantt.attachEvent(eventsNames.added, function(itemId, item) {
                snapshotHandlerObj.save(item);
            }));

            gEventsCollection.add(gantt.attachEvent(eventsNames.updated, function(itemId, item) {
                snapshotHandlerObj.save(item);
            }));
//needs editing to delete all sub tasks and links
            gEventsCollection.add(gantt.attachEvent(eventsNames.removed, function(itemId) {
                snapshotHandlerObj.remove(itemId);
            }));

            var methods = itemTypeSettings.methods;
            gFirebaseListenersCollection.add(dataSnapshot.on("child_added", function(dataSnapshot) {
                var itemData = serializeData(dataSnapshot.val(), true);

                if(!methods.isExists(itemData.id))
                    methods.add(itemData);
            }));

            gFirebaseListenersCollection.add(dataSnapshot.on("child_changed", function(dataSnapshot) {
                var itemData = serializeData(dataSnapshot.val(), true);

                if(!methods.isExists(itemData.id))
                    return false;

                var item = methods.get(itemData.id);
                for(var key in itemData)
                    item[key] = itemData[key];

                methods.update(itemData.id);
                return true;
            }));

            gFirebaseListenersCollection.add(dataSnapshot.on("child_removed", function(dataSnapshot) {
                var itemData = dataSnapshot.val();
                if(methods.isExists(itemData.id)) {
                    var item = methods.get(itemData.id);
                    methods.remove(item.id);
                }
            }));

        }

        function getItemTypeSettings(gantt, itemType) {
            var methods = {
                    isExists: function() {},
                    get: function() {},
                    add: function() {},
                    update: function() {},
                    remove: function() {}
                },
                eventsNames = {
                    added: "",
                    updated: "",
                    removed: ""
                };

            function isExistsItem(itemId) {
                return (itemId != null);
            }

            switch(itemType) {
                case "task":
                    methods.isExists = function(taskId) {return (isExistsItem(taskId) && gantt.isTaskExists(taskId))};
                    methods.get = gantt.getTask;
                    methods.add = gantt.addTask;
                    methods.update = gantt.updateTask;
                    methods.remove = gantt.deleteTask;
                    eventsNames.added = "onAfterTaskAdd";
                    eventsNames.updated = "onAfterTaskUpdate";
                    eventsNames.removed = "onAfterTaskDelete";
                    break;

                case "link":
                    methods.isExists = function(linkId) {return (isExistsItem(linkId) && gantt.isLinkExists(linkId))};
                    methods.get = gantt.getLink;
                    methods.add = gantt.addLink;
                    methods.update = gantt.updateLink;
                    methods.remove = gantt.deleteLink;
                    eventsNames.added = "onAfterLinkAdd";
                    eventsNames.updated = "onAfterLinkUpdate";
                    eventsNames.removed = "onAfterLinkDelete";
                    break;
            }

            for(var method in methods)
                methods[method] = methods[method].bind(gantt);

            return {methods: methods, events_names: eventsNames};
        }
    };
    
    gantt.firebaseStop = function() {
        var self = this;
        if(gEventsCollection) {
            gEventsCollection.each(function(eventId) {
                self.detachEvent(eventId);
            });
            gEventsCollection.clean();
        }

        if(gFirebaseListenersCollection) {
            var eventsTypes = ["child_added", "child_changed", "child_removed"];
            gFirebaseListenersCollection.each(function(listener) {
                for(var i = 0; i < eventsTypes.count; i++) {
                    var eventType = eventsTypes[i];
                    gDataSnapshots["tasks"].off(eventType, listener);
                    gDataSnapshots["links"].off(eventType, listener);
                }
            });
            gFirebaseListenersCollection.clean();
        }
    };
    
    function serializeData(item, unserilize) {
     

        var parsedData = {};
        for(var property in item) {
            if(property.charAt(0) == "$")
                continue;

            parsedData[property] = item[property].valueOf();

         if(property == "id")
          parsedData[property] = parsedData[property].toString();

          if (unserilize && (property == "Cost_Dollar" || property == "Cost_Yemeni" || property == "Allocated_budget" || property == "Spent" || property == "The_Balance" || property == "Precentage" || property == "Jan_FC" || property == "Feb_FC" || property == "Mar_FC" || property == "Apr_FC" || property == "May_FC" || property == "Jun_FC" || property == "Jul_FC" || property == "Aug_FC" || property == "Sep_FC" || property == "Oct_FC" || property == "Nov_FC" || property == "Dec_FC" || property == "Total" || property == "final_remaining" ))
            parsedData[property] = Number(parsedData[property]);
     

            if(unserilize && (property == "start_date" || property == "end_date"))
                parsedData[property] = new Date(parsedData[property]);
        }
       
        return parsedData;
        
    }
    
    function SnapshotHandler(dataSnapshot) {

        this.save = function(item) {
            item = serializeData(item);
            this.findItem(item.id, function(dataSnapshot) {
                if(dataSnapshot.exists())
                    dataSnapshot.ref().update(item);
                else
                    dataSnapshot.ref().push(item);
            });
        };

        this.remove = function(eventId) {
            this.findItem(eventId, function(dataSnapshot) {
                if(dataSnapshot.exists())
                    dataSnapshot.ref().remove();
            });
        };

        this.findItem = function(eventId, callback) {
            dataSnapshot.orderByChild("id").equalTo(eventId).once("value", function(eventSnapshot) {
                if(!eventSnapshot.exists())
                    callback.call(null, eventSnapshot);

                eventSnapshot.forEach(function(dataSnapshot) {
                    callback.call(null, dataSnapshot);
                });
            });
        };
    }
    
    function DataCollection() {
        var collectionData = {},
            currentUid = new Date().valueOf();

        function _uid() {
            return currentUid++;
        }

        this.add = function(data) {
            var dataId = _uid();
            collectionData[dataId] = data;
            return dataId;
        };

        this.each = function(handler) {
            for(var key in collectionData)
                handler.call(this, collectionData[key]);
        };

        this.clean = function() {
            collectionData = {};
        };
    }

})();
//The "End" of firebase Adapter





//The "start" of firebase config for SDk 6 for reordering pouroses

function firebaseConfigInfo(){
    var firebaseConfig = {
        apiKey: "AIzaSyByY_StlwAyml1ZzhTjT9hxAZJIEUpYOYI",
        authDomain: "fir-slickgrid-app.firebaseapp.com",
        databaseURL: "https://fir-slickgrid-app-default-rtdb.firebaseio.com",
        projectId: "fir-slickgrid-app",
        storageBucket: "fir-slickgrid-app.firebasestorage.app",
        messagingSenderId: "632345189503",
        appId: "1:632345189503:web:5ea427e9d8ce2ea5cc734a"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


};

//The Gantt Shape like scrolling and two halfs and keyboard naviagtion
function ganttlayoutshape(){

    gantt.plugins({
        keyboard_navigation: true,
    });
    
    gantt.config.open_tree_initially = true;
    // Make drag and drop
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    
    gantt.config.keyboard_navigation = true;
    gantt.config.keyboard_navigation_cells = true;
    
    
    gantt.config.layout = {
        css: "gantt_container",
        cols: [
            {
                rows: [
                    {
                        view: "grid",
                        scrollable: true,
                        scrollX: "scrollHor1",
                        scrollY: "scrollVer"
                    },
                    {
                        view: "scrollbar",
                        id: "scrollHor1",
                        scroll: 'x',
                        group: 'hor'
                    },
                ]
            },
            { resizer: true, width: 1 },
            {
                rows: [
                    {
                        view: "timeline",
                        scrollX: "scrollHor",
                        scrollY: "scrollVer"
                    },
                    {
                        view: "scrollbar",
                        id: "scrollHor",
                        scroll: 'x',
                        group: 'hor'
                    },
                ]
            },
            {
                view: "scrollbar",
                id: "scrollVer"
            }
        ]
    }
    
    

};



//Freeze WBS and Task "Start"
function freezecolmunsmain (){


gantt.attachEvent("onGanttReady", function () {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener('scroll', function () {
            document.documentElement.style.setProperty('--gantt-frozen-column-scroll-left', el.scrollLeft + "px");
            const frozenColumn = document.querySelector(`[data-column-index="2"]`);
            document.documentElement.style.setProperty('--gantt-frozen-column-resizer-left', el.scrollLeft + frozenColumn.offsetWidth + "px");
        });
    }
});


gantt.attachEvent("onDataRender", function () {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        const frozenColumn = document.querySelector(`[data-column-index="2"]`);
        document.documentElement.style.setProperty('--gantt-frozen-column-resizer-left', el.scrollLeft + frozenColumn.offsetWidth + "px");
    }
});


gantt.attachEvent("onColumnResizeEnd", function (index, column, new_width) {
    console.log(index, column, new_width);
    if (!index) {
        new_width -= document.querySelector(".gantt_hor_scroll").scrollLeft
        setTimeout(function () {
            gantt.config.columns[1].width = new_width
            gantt.config.columns[2].width = new_width
            gantt.render()
        }, 50)
        return false

    }
    return true;
});

};
//Freeze WBS and Task "End"


//Other Functions for repeating onaftertaskdelete so the adapter has many calls "start"
gantt.plugins({fullscreen: true});

gantt.plugins({
    multiselect: true
});

var dp = gantt.createDataProcessor({ 
   task: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {
        
    gantt.callEvent("onAfterTaskDelete",[id, task]);

      }
   },
   link: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {

        gantt.callEvent("onAfterLinkDelete",[id, link]);
      }
   }
});
//Other Functions for repeating onaftertaskdelete so the adapter has many calls "End"





//Deep Copy Paste "Start"
var child_links;
var clone_original_ids_table;

function obtain_link_ids(id){
  var task = gantt.getTask(id);
  var source_links = task.$source;
  for (var i = 0; i < source_links.length; i++) {
	child_links.push(source_links[i]);
  } 
}

function create_clone_original_ids_table(original_id, clone_id){
  clone_original_ids_table[original_id] = clone_id;
}

function clone_child_links(){
  for (var i = 0; i < child_links.length; i++) {
    var link = gantt.getLink(child_links[i]);
    if (clone_original_ids_table[link.source] && clone_original_ids_table[link.target]){
      var clone_link = {};
      clone_link.id = gantt.uid();
      clone_link.target = clone_original_ids_table[link.target];
      clone_link.source = clone_original_ids_table[link.source];
      clone_link.type = link.type;
      gantt.addLink(clone_link)
    }
  }
}


function clone_children(id, new_parent){
  var task = gantt.getTask(id);
  
 
  var children = gantt.getChildren(id)
  for (var i = 0; i < children.length; i++) {
    var child_original = gantt.getTask(children[i]);
    var child_clone = gantt.copy(child_original);
    child_clone.id = gantt.uid();
    child_clone.parent = new_parent;
    gantt.addTask(child_clone, child_clone.parent, child_clone.$index);
    
    obtain_link_ids(child_original.id);
	create_clone_original_ids_table(child_original.id, child_clone.id);

    if (gantt.hasChild(child_original.id)) clone_children(child_original.id, child_clone.id);
  }
  
} 

function clone_task(id){
  var task = gantt.getTask(id);
  var clone = gantt.copy(task);
  var clones  = []; 
  clone.id = gantt.uid();
  gantt.addTask(clone, clone.parent, clone.$index);
  
  child_links = [];
  obtain_link_ids(id);
  
  clone_original_ids_table = {};
  create_clone_original_ids_table(task.id, clone.id);
 
  if (gantt.hasChild(id)) {
    clone_children(id, clone.id)
  }
  
  clone_child_links()

}
//Deep Copy Paste "End"




//Toggle Grid and timline "Start"


const onlyGrid = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollY: "scrollVer" },
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};

const gridAndChart = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollY: "scrollVer" },
                { view: "scrollbar", id: "gridScroll", group: "horizontal" }
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor", group: "horizontal" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};

let showChart = true;
function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart;
    }
    else {
        gantt.config.layout = onlyGrid;

    }
    gantt.init("gantt_here");
}


const onlyChart = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};

const chartAndGrid = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollY: "scrollVer" },
                { view: "scrollbar", id: "gridScroll", group: "horizontal" }
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor", group: "horizontal" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};

let showGrid = true;
function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = chartAndGrid;
    }
    else {
        gantt.config.layout = onlyChart;

    }
    gantt.init("gantt_here");
}
//Toggle Grid and timline "End"





//Let the colmuns be reoredered and timeline fit the tasks periods "Start"
gantt.config.reorder_grid_columns = true;
gantt.config.fit_tasks = true;
//Let the colmuns be reoredered and timeline fit the tasks periods "End"



//Color the row based in status "Start"
function statusChangeRowsColor (){

    //change grid color
    gantt.templates.grid_row_class = function(start, end, task){
        
if(task.status == 'Done'){return "done_color";}else if(task.status == 'In Progress'){return "inpro_color";}else if(task.status =='Canceled') {return "cancel_color";};
        
    };

};
//Color the row based in status "Start"





//To hide Lightbox to disable ading new tasks or delete "Start"
function hideLightbox (){

    gantt.attachEvent("onBeforeLightbox", function(id) {
        return false;
    });
};

//To hide Lightbox to disable ading new tasks or delete "End"

//Show the task name when the mouse is move over it
function highlighttaskalert(){
    gantt.$container.addEventListener("mouseover", function(event){
        const taskId = gantt.locate(event);
        if(gantt.isTaskExists(taskId)){
           gantt.message({
             id:1,
             text:"Mouse over " + gantt.getTask(taskId).text});
        }
    });
    
    console.log("Task data store: ", gantt.getDatastore("task"));

}







inlineEditors.attachEvent("onBeforeEditStart", function(state){
    var task = gantt.getTask(state.id);
    if(state.columnName === "Precentage" || state.columnName === "The_Balance" || state.columnName === "Total" || state.columnName === "final_remaining"){
    return false;
    }
    return true;
    });




    gantt.attachEvent("onGanttReady", function(){
        gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn"];   
        gantt.config.buttons_right = ["gantt_delete_btn"];               
     });



gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},                                                                        
];









