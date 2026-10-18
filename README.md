**Green Logic**
-
We are a High Tech Greenhouse Log tool. We provide instant feedback, based on the input conditions. We will calculate what threat level your current green house is.
-
**Less than 4 user click journey Funnel**
-
Starting State
     The Page loads, with two containers, one for data entry with the other being blank. 
    Or if it’s a recurring visitor, the blank container is filled with the previously stored 
    data. 
1. Action 1 Data entry 
    The user Enters PH Values (0-14, and negative values immediately rejected), EC 
    Values, Temp Values, and Rh values. 
2. Action 2 Output telemetry 
    Once the Submit button is pressed, theapp.js will take the data, store the 
    data locally, and compare, for immediate feedback.
-  
3. Action 3 Output Telemetry  
    The Second container will update with a new card, featuring the data entered from 
the previous step. 
    Action 4 Output resolution  
    Action 4 You can interact with it by purging the entire (local data), or just deleting 
    the individual item saved from the list. 
5. Terminal State  
     The user was able to add and remove data from a stored section and received 
    feedback on the data.    
-
**User Storys**
-
Story 1 (Controlled Sensor Entry): As a greenhouse technician, I want to record telemetry readings for a specific bay with real-time numeric bounds enforcement so that invalid sensor inputs (e.g., pH outside 0 to 14 or negative values) are rejected immediately. 
-Techinal Review- Form to record data, data validation

Story 2 (Status Feedback): As an agronomist, I want the portal to calculate and display an environmental status tag ("Optimal", "Warning", "Critical Hazard") immediately upon input submission. 
-Techinal Review- logic for determining state, upon submission

Story 3 (Offline Session Persistence): As a field worker moving between greenhouses, I want logged sensor entries saved to localStorage so that refreshing the browser retains active log history. 
-techinal Review- Store data in local browser

Story 4 (Log Removal & Queue Purging): As an operations supervisor, I want to delete resolved logs individually or purge the entire log history.
-Techinal Review- Delete All button, and indvuidual delete for each item

Story 5 (Dynamic Out-of-Bound Indicators): As a technician typing values into the form, Iwant input fields to show instant visual error feedback whenever entered numbers exceed acceptable plant growth ranges.
-Techinal Review- Data Validation, Error msg


-
**DOM**
-
```
html
│
├── head
│   └── link [rel="stylesheet", href="style.css"]
│
├── body
│   │
│   ├── header [class="page-header"]  
│   │   ├── div [class="page-title"]
│   │   └── h1 [class="page-title"]
│   │       └── "Growth sense"
│   │
│   ├── main [class="main-layout"]  
│   │   │
│   │   ├── aside [class="left-panel"]
│   │   │   └── form [id="growth-metrics"]  
│   │   │       ├── h2
│   │   │       │   └── "Log Growth Metrics"
│   │   │       ├── div [class="form-group"]
│   │   │       ├── div [class="form-group"]
│   │   │       │   ├── label
│   │   │       │   └── input [id="number-ph", type="number", min="1", max="14"]
│   │   │       ├── div [class="form-group"]
│   │   │       │   ├── label
│   │   │       │   └── input [id="number-temp", type="number"]
│   │   │       ├── div [class="form-group"]
│   │   │       │   ├── label
│   │   │       │   └── input [id="number-ec", type="number"]
│   │   │       ├── div [class="form-group"]
│   │   │       │   ├── label
│   │   │       │   └── input [id="number-rh", type="number"]
│   │   │       ├── div [class="form-group"]
│   │   │       │   ├── label
│   │   │       │   └── input [id="string-status", type="text"]
│   │   │       └── button [type="submit", class="btn btn-submit"]
│   │   │           └── "Log Data"
│   │   │
│   │   └── section [class="log-panel"]
│   │       ├── header
│   │       │   ├── h2
│   │       │   │   └── "Plant Log"
│   │       │   └── button [id="btn-clear-all", class="btn btn-purge"]
│   │       │       └── "Purge Log"
│   │       ├── div [id="empty-state", class="empty"]
│   │       │   └── "No plant data"
│   │       └── ul [id="plant-log", class="record-grid"]  
│   │           └── li [class="patient-card status-critical", data-id="..."]  
│   │               ├── div [class="card-header"]
│   │               │   └── "(pH, temp, EC, RH, status status indicators)"
│   │               ├── div [class="plant-grid"]  
│   │               └── button [class="btn btn-delete"]
│   │                   └── "Clear Plant Data"
│   │
│   ├── script [src="app.js"]
│   │
│   └── footer [class="page-footer"]

```
-
**Data Schema**
-
Bay Number "number" //Number of the Bay from the greenhouse  
PH “number” //# number for the given PH 
Air Temperature “number” //# number for the air temp in degrees f 
Electrical Conductivity “number” //# mS/cm 
Relative Humidity “number” // percentage of relative humidity  
Status “string” //optimal, warning, or critical