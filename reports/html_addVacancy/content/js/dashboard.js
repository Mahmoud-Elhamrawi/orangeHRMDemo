/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8840579710144928, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "saveVacancy-65"], "isController": false}, {"data": [1.0, 500, 1500, "saveVacancy-66"], "isController": false}, {"data": [1.0, 500, 1500, "saveVacancy-63"], "isController": false}, {"data": [1.0, 500, 1500, "saveVacancy-64"], "isController": false}, {"data": [1.0, 500, 1500, "saveVacancy-61"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-20"], "isController": false}, {"data": [0.0, 500, 1500, "saveLogin"], "isController": true}, {"data": [1.0, 500, 1500, "saveVacancy-60"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-25-1"], "isController": false}, {"data": [0.0, 500, 1500, "GetLandingPage"], "isController": true}, {"data": [1.0, 500, 1500, "navigateToRecruitment-25-0"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-19"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-18"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-38"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-37"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-36"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-57"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-58"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-13"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-55"], "isController": false}, {"data": [0.5, 500, 1500, "saveLogin-12"], "isController": false}, {"data": [0.0, 500, 1500, "navigateToVacancy"], "isController": true}, {"data": [0.5, 500, 1500, "logOut-67"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-14"], "isController": false}, {"data": [1.0, 500, 1500, "logOut-68"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-17"], "isController": false}, {"data": [1.0, 500, 1500, "logOut-69"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-16"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-35"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-34"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-33"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-32"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-31"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-30"], "isController": false}, {"data": [0.5, 500, 1500, "logOut-67-0"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-29"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-27"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToRecruitment-26"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "navigateToRecruitment-25"], "isController": false}, {"data": [1.0, 500, 1500, "saveVacancy-59"], "isController": false}, {"data": [1.0, 500, 1500, "logOut-67-1"], "isController": false}, {"data": [0.0, 500, 1500, "saveVacancy"], "isController": true}, {"data": [0.8333333333333334, 500, 1500, "navigateToVacan-39"], "isController": false}, {"data": [0.0, 500, 1500, "navigateToRecruitment "], "isController": true}, {"data": [1.0, 500, 1500, "navigateToVacancies-50"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-54"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-51"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-52"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-12-1"], "isController": false}, {"data": [0.5, 500, 1500, "saveLogin-12-0"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-22"], "isController": false}, {"data": [1.0, 500, 1500, "GetLandingPage-4"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-21"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-47"], "isController": false}, {"data": [0.0, 500, 1500, "GetLandingPage-1"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-44"], "isController": false}, {"data": [1.0, 500, 1500, "GetLandingPage-2"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-23"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-45"], "isController": false}, {"data": [0.5, 500, 1500, "logOut"], "isController": true}, {"data": [1.0, 500, 1500, "navigateToVacancies-48"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToVacancies-49"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 126, 0, 0.0, 302.81746031746025, 78, 1620, 252.0, 451.59999999999997, 536.0499999999998, 1405.350000000003, 2.873956480087587, 43.7449971274691, 1.816292204107933], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["saveVacancy-65", 3, 0, 0.0, 233.66666666666666, 228, 239, 234.0, 239.0, 239.0, 239.0, 0.1343183344526528, 0.4976599227669577, 0.08158789456010745], "isController": false}, {"data": ["saveVacancy-66", 3, 0, 0.0, 226.33333333333334, 223, 231, 225.0, 231.0, 231.0, 231.0, 0.13430029546065, 0.14413674288208433, 0.0743635425060435], "isController": false}, {"data": ["saveVacancy-63", 3, 0, 0.0, 251.33333333333334, 236, 271, 247.0, 271.0, 271.0, 271.0, 0.13425221516155017, 0.17860963651212744, 0.07276365177212923], "isController": false}, {"data": ["saveVacancy-64", 3, 0, 0.0, 242.33333333333334, 237, 245, 245.0, 245.0, 245.0, 245.0, 0.13425221516155017, 0.7681481724917211, 0.08089220386198873], "isController": false}, {"data": ["saveVacancy-61", 3, 0, 0.0, 448.0, 422, 488, 434.0, 488.0, 488.0, 488.0, 0.1332090049287332, 13.23651744482927, 0.0723283268948981], "isController": false}, {"data": ["saveLogin-20", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 217.0, 4.608294930875576, 5.589357718894009, 2.6956725230414746], "isController": false}, {"data": ["saveLogin", 1, 0, 0.0, 3450.0, 3450, 3450, 3450.0, 3450.0, 3450.0, 3450.0, 0.2898550724637681, 37.092674365942024, 2.193727355072464], "isController": true}, {"data": ["saveVacancy-60", 3, 0, 0.0, 276.6666666666667, 258, 314, 258.0, 314.0, 314.0, 314.0, 0.1345895020188425, 1.0935397039030956, 0.08648426985195155], "isController": false}, {"data": ["navigateToRecruitment-25-1", 3, 0, 0.0, 273.6666666666667, 268, 283, 270.0, 283.0, 283.0, 283.0, 0.1223590831226038, 0.890688091402235, 0.07719137470429888], "isController": false}, {"data": ["GetLandingPage", 1, 0, 0.0, 2149.0, 2149, 2149, 2149.0, 2149.0, 2149.0, 2149.0, 0.46533271288971617, 48.93082538389949, 0.7029977605863192], "isController": true}, {"data": ["navigateToRecruitment-25-0", 3, 0, 0.0, 250.0, 224, 288, 238.0, 288.0, 288.0, 288.0, 0.12258407224287991, 0.2081774429984064, 0.07817128825644588], "isController": false}, {"data": ["saveLogin-19", 1, 0, 0.0, 233.0, 233, 233, 233.0, 233.0, 233.0, 233.0, 4.291845493562231, 4.715162285407725, 2.606960836909871], "isController": false}, {"data": ["saveLogin-18", 1, 0, 0.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 243.0, 4.11522633744856, 5.795074588477366, 2.4393968621399176], "isController": false}, {"data": ["navigateToRecruitment-38", 3, 0, 0.0, 238.33333333333334, 236, 240, 239.0, 240.0, 240.0, 240.0, 0.1227495908346972, 0.266596767594108, 0.06964600808101473], "isController": false}, {"data": ["navigateToRecruitment-37", 3, 0, 0.0, 243.33333333333334, 234, 256, 240.0, 256.0, 256.0, 256.0, 0.12275963663147557, 0.266618585808986, 0.06965170789344464], "isController": false}, {"data": ["navigateToRecruitment-36", 3, 0, 0.0, 232.33333333333334, 224, 240, 233.0, 240.0, 240.0, 240.0, 0.12275963663147557, 0.13558705959980358, 0.06677452890989442], "isController": false}, {"data": ["navigateToVacancies-57", 3, 0, 0.0, 276.3333333333333, 276, 277, 276.0, 277.0, 277.0, 277.0, 0.12626262626262627, 0.8583145912247474, 0.0792840514520202], "isController": false}, {"data": ["navigateToVacancies-58", 3, 0, 0.0, 240.66666666666666, 235, 250, 237.0, 250.0, 250.0, 250.0, 0.12640094379371367, 0.2089812478933176, 0.07949434355776523], "isController": false}, {"data": ["saveLogin-13", 1, 0, 0.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 266.0, 3.7593984962406015, 28.26891447368421, 2.312911184210526], "isController": false}, {"data": ["navigateToVacancies-55", 3, 0, 0.0, 232.33333333333334, 227, 239, 231.0, 239.0, 239.0, 239.0, 0.12645955401930617, 0.723561061522573, 0.07582633414829491], "isController": false}, {"data": ["saveLogin-12", 1, 0, 0.0, 825.0, 825, 825, 825.0, 825.0, 825.0, 825.0, 1.2121212121212122, 11.228693181818182, 1.9247159090909092], "isController": false}, {"data": ["navigateToVacancy", 3, 0, 0.0, 3847.3333333333335, 3462, 4390, 3690.0, 4390.0, 4390.0, 4390.0, 0.10754229997132206, 26.699546417945225, 0.8426947411815314], "isController": true}, {"data": ["logOut-67", 1, 0, 0.0, 753.0, 753, 753, 753.0, 753.0, 753.0, 753.0, 1.3280212483399734, 8.113379814077025, 1.6016662516600266], "isController": false}, {"data": ["saveLogin-14", 1, 0, 0.0, 445.0, 445, 445, 445.0, 445.0, 445.0, 445.0, 2.247191011235955, 223.30143960674158, 1.191625702247191], "isController": false}, {"data": ["logOut-68", 1, 0, 0.0, 232.0, 232, 232, 232.0, 232.0, 232.0, 232.0, 4.310344827586206, 18.90827047413793, 2.706593480603448], "isController": false}, {"data": ["saveLogin-17", 1, 0, 0.0, 244.0, 244, 244, 244.0, 244.0, 244.0, 244.0, 4.0983606557377055, 4.874807889344263, 2.4574154713114753], "isController": false}, {"data": ["logOut-69", 1, 0, 0.0, 477.0, 477, 477, 477.0, 477.0, 477.0, 477.0, 2.0964360587002098, 208.2084479821803, 1.10144785115304], "isController": false}, {"data": ["saveLogin-16", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 8.619894192913385, 2.5836614173228347], "isController": false}, {"data": ["navigateToRecruitment-35", 3, 0, 0.0, 228.66666666666666, 219, 236, 231.0, 236.0, 236.0, 236.0, 0.12278475831866738, 0.13561480630704376, 0.0667881937338845], "isController": false}, {"data": ["navigateToRecruitment-34", 3, 0, 0.0, 138.66666666666666, 78, 257, 81.0, 257.0, 257.0, 257.0, 0.12303654185293031, 0.07016927777549932, 0.07882028462453348], "isController": false}, {"data": ["navigateToRecruitment-33", 3, 0, 0.0, 247.0, 242, 254, 245.0, 254.0, 254.0, 254.0, 0.12272448353446512, 0.17413933064021273, 0.07502492841071794], "isController": false}, {"data": ["navigateToRecruitment-32", 3, 0, 0.0, 231.33333333333334, 215, 242, 237.0, 242.0, 242.0, 242.0, 0.12291555701233252, 0.16696830058999468, 0.07466159810710042], "isController": false}, {"data": ["navigateToRecruitment-31", 3, 0, 0.0, 239.33333333333334, 234, 243, 241.0, 243.0, 243.0, 243.0, 0.12310722639418935, 0.704380116644097, 0.07393646897697895], "isController": false}, {"data": ["navigateToRecruitment-30", 3, 0, 0.0, 296.3333333333333, 281, 308, 300.0, 308.0, 308.0, 308.0, 0.12271946330688047, 1.0028481142109138, 0.08329104199050968], "isController": false}, {"data": ["logOut-67-0", 1, 0, 0.0, 525.0, 525, 525, 525.0, 525.0, 525.0, 525.0, 1.9047619047619047, 3.275669642857143, 1.101190476190476], "isController": false}, {"data": ["navigateToRecruitment-29", 3, 0, 0.0, 235.0, 227, 243, 235.0, 243.0, 243.0, 243.0, 0.12223444566678891, 0.3100425783319073, 0.07878392005867253], "isController": false}, {"data": ["navigateToRecruitment-27", 3, 0, 0.0, 411.3333333333333, 376, 436, 422.0, 436.0, 436.0, 436.0, 0.12149684108213187, 12.072720288959987, 0.06573168941357525], "isController": false}, {"data": ["navigateToRecruitment-26", 3, 0, 0.0, 271.0, 255, 284, 274.0, 284.0, 284.0, 284.0, 0.12231917149147843, 0.8903975627905081, 0.07716619607763191], "isController": false}, {"data": ["navigateToRecruitment-25", 3, 0, 0.0, 524.3333333333334, 493, 558, 522.0, 558.0, 558.0, 558.0, 0.121246413126945, 1.0884944100351615, 0.1538077057147476], "isController": false}, {"data": ["saveVacancy-59", 3, 0, 0.0, 253.66666666666666, 240, 262, 259.0, 262.0, 262.0, 262.0, 0.13454121445869585, 0.17899412223069336, 0.1018694221454839], "isController": false}, {"data": ["logOut-67-1", 1, 0, 0.0, 227.0, 227, 227, 227.0, 227.0, 227.0, 227.0, 4.405286343612335, 19.337658314977972, 2.766210077092511], "isController": false}, {"data": ["saveVacancy", 3, 0, 0.0, 1932.0, 1854, 2013, 1929.0, 2013.0, 2013.0, 2013.0, 0.11761477241541538, 14.190497951542714, 0.49967135247187044], "isController": true}, {"data": ["navigateToVacan-39", 3, 0, 0.0, 356.6666666666667, 170, 727, 173.0, 727.0, 727.0, 727.0, 0.12307692307692307, 0.07680288461538462, 0.060216346153846155], "isController": false}, {"data": ["navigateToRecruitment ", 3, 0, 0.0, 3537.0, 3523, 3556, 3532.0, 3556.0, 3556.0, 3556.0, 0.10813928339701535, 15.35077961664624, 0.9133756465827986], "isController": true}, {"data": ["navigateToVacancies-50", 3, 0, 0.0, 269.6666666666667, 249, 298, 262.0, 298.0, 298.0, 298.0, 0.12649687974363297, 0.17949215455810422, 0.07733110031202563], "isController": false}, {"data": ["navigateToVacancies-54", 3, 0, 0.0, 238.66666666666666, 233, 247, 236.0, 247.0, 247.0, 247.0, 0.12635303036684498, 0.45379328907467464, 0.07637941972370804], "isController": false}, {"data": ["navigateToVacancies-51", 3, 0, 0.0, 295.0, 267, 339, 279.0, 339.0, 339.0, 339.0, 0.126098104325165, 0.8962324250767096, 0.08078159808330881], "isController": false}, {"data": ["navigateToVacancies-52", 3, 0, 0.0, 422.6666666666667, 383, 443, 442.0, 443.0, 443.0, 443.0, 0.125250501002004, 12.445382301060453, 0.06764016313877755], "isController": false}, {"data": ["saveLogin-12-1", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 26.855468749999996, 2.546037946428571], "isController": false}, {"data": ["saveLogin-12-0", 1, 0, 0.0, 542.0, 542, 542, 542.0, 542.0, 542.0, 542.0, 1.8450184501845017, 3.217971632841328, 1.614391143911439], "isController": false}, {"data": ["saveLogin-22", 1, 0, 0.0, 213.0, 213, 213, 213.0, 213.0, 213.0, 213.0, 4.694835680751174, 4.864473298122066, 2.9342723004694835], "isController": false}, {"data": ["GetLandingPage-4", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 16.73418209876543, 6.2692901234567895], "isController": false}, {"data": ["saveLogin-21", 1, 0, 0.0, 229.0, 229, 229, 229.0, 229.0, 229.0, 229.0, 4.366812227074235, 5.944664301310043, 2.5970592248908297], "isController": false}, {"data": ["navigateToVacancies-47", 3, 0, 0.0, 248.66666666666666, 236, 268, 242.0, 268.0, 268.0, 268.0, 0.12677484787018256, 0.7253650719447261, 0.07613919085953347], "isController": false}, {"data": ["GetLandingPage-1", 1, 0, 0.0, 1620.0, 1620, 1620, 1620.0, 1620.0, 1620.0, 1620.0, 0.6172839506172839, 2.7615017361111107, 0.29477719907407407], "isController": false}, {"data": ["navigateToVacancies-44", 3, 0, 0.0, 326.0, 255, 460, 263.0, 460.0, 460.0, 460.0, 0.12550725850311678, 0.8952197422917626, 0.08052565316069113], "isController": false}, {"data": ["GetLandingPage-2", 1, 0, 0.0, 448.0, 448, 448, 448.0, 448.0, 448.0, 448.0, 2.232142857142857, 221.70366559709822, 1.1727469308035714], "isController": false}, {"data": ["saveLogin-23", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 8.260815169039144, 2.043483096085409], "isController": false}, {"data": ["navigateToVacancies-45", 3, 0, 0.0, 428.0, 421, 436, 427.0, 436.0, 436.0, 436.0, 0.12571237009721756, 12.491602806528663, 0.06801235647837747], "isController": false}, {"data": ["logOut", 1, 0, 0.0, 1462.0, 1462, 1462, 1462.0, 1462.0, 1462.0, 1462.0, 0.6839945280437756, 75.11048114740082, 1.6137995896032833], "isController": true}, {"data": ["navigateToVacancies-48", 3, 0, 0.0, 276.3333333333333, 257, 311, 261.0, 311.0, 311.0, 311.0, 0.12669453946534906, 0.916514567232569, 0.08438054288610161], "isController": false}, {"data": ["navigateToVacancies-49", 3, 0, 0.0, 236.33333333333334, 225, 255, 229.0, 255.0, 255.0, 255.0, 0.12698412698412698, 0.3220899470899471, 0.0818452380952381], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 126, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
