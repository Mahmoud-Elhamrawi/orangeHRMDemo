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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8265895953757225, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "saveJob-284"], "isController": false}, {"data": [1.0, 500, 1500, "saveJob-283"], "isController": false}, {"data": [0.0, 500, 1500, "saveLogin"], "isController": true}, {"data": [1.0, 500, 1500, "saveEmp-269"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "saveEmp-268"], "isController": false}, {"data": [0.0, 500, 1500, "GetLandingPage"], "isController": true}, {"data": [1.0, 500, 1500, "saveEmp-267"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "saveEmp-266"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "saveEmp-265"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-264"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "saveEmp-263"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-262"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-261"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-260"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-280"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-281"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "saveJob"], "isController": true}, {"data": [0.5, 500, 1500, "logOut-285"], "isController": false}, {"data": [1.0, 500, 1500, "logOut-286"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToAddEmp-249"], "isController": false}, {"data": [0.5, 500, 1500, "logOut-287"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToAddEmp-248"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "navigateToAddEmp-246"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToAddEmp-245"], "isController": false}, {"data": [0.0, 500, 1500, "navigateToPim"], "isController": true}, {"data": [0.0, 500, 1500, "saveEmp"], "isController": true}, {"data": [0.5, 500, 1500, "saveEmp-259"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-258"], "isController": false}, {"data": [0.5, 500, 1500, "saveEmp-257"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-256"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "saveEmp-255"], "isController": false}, {"data": [0.5, 500, 1500, "saveLogin-220-0"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-220-1"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-238"], "isController": false}, {"data": [0.5, 500, 1500, "navigateToPim-239"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "navigateToPim-237"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-241"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-242"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-240"], "isController": false}, {"data": [0.0, 500, 1500, "screenJob"], "isController": true}, {"data": [1.0, 500, 1500, "navigateToPim-243"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-244"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToAddEmp-254"], "isController": false}, {"data": [1.0, 500, 1500, "logOut-285-0"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToAddEmp-250"], "isController": false}, {"data": [0.0, 500, 1500, "navigateToAddEmp"], "isController": true}, {"data": [1.0, 500, 1500, "logOut-285-1"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-231"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-230"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-226"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-273"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-225"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-274"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-228"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-271"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-227"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "screenJob-272"], "isController": false}, {"data": [0.5, 500, 1500, "saveLogin-222"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-277"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-221"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-278"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-224"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-275"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-276"], "isController": false}, {"data": [0.5, 500, 1500, "GetLandingPage-219"], "isController": false}, {"data": [1.0, 500, 1500, "screenJob-279"], "isController": false}, {"data": [0.0, 500, 1500, "GetLandingPage-218"], "isController": false}, {"data": [1.0, 500, 1500, "saveLogin-229"], "isController": false}, {"data": [1.0, 500, 1500, "saveEmp-270"], "isController": false}, {"data": [0.5, 500, 1500, "saveLogin-220"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-237-0"], "isController": false}, {"data": [1.0, 500, 1500, "navigateToPim-237-1"], "isController": false}, {"data": [0.5, 500, 1500, "logOut"], "isController": true}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 155, 0, 0.0, 385.50322580645167, 202, 3571, 262.0, 556.0, 751.5999999999988, 2968.9999999999977, 0.9091122372372372, 12.976213976427598, 0.565359900305579], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["saveJob-284", 3, 0, 0.0, 238.0, 233, 244, 237.0, 244.0, 244.0, 244.0, 0.03261826840485795, 0.041155080838941864, 0.022488767083818077], "isController": false}, {"data": ["saveJob-283", 3, 0, 0.0, 249.66666666666666, 242, 263, 244.0, 263.0, 263.0, 263.0, 0.032607632359814356, 0.0459181697879417, 0.02302277167592361], "isController": false}, {"data": ["saveLogin", 1, 0, 0.0, 3669.0, 3669, 3669, 3669.0, 3669.0, 3669.0, 3669.0, 0.2725538293813028, 35.414430873535025, 2.069439476015263], "isController": true}, {"data": ["saveEmp-269", 3, 0, 0.0, 268.6666666666667, 228, 330, 248.0, 330.0, 330.0, 330.0, 0.030855626523496556, 0.08768542303063963, 0.017808276636119596], "isController": false}, {"data": ["saveEmp-268", 3, 0, 0.0, 1073.3333333333333, 255, 2496, 469.0, 2496.0, 2496.0, 2496.0, 0.031295313005288906, 0.08893492270057687, 0.01806204100207592], "isController": false}, {"data": ["GetLandingPage", 1, 0, 0.0, 2470.0, 2470, 2470, 2470.0, 2470.0, 2470.0, 2470.0, 0.4048582995951417, 42.03291055161943, 0.40604440789473684], "isController": true}, {"data": ["saveEmp-267", 3, 0, 0.0, 250.33333333333334, 216, 279, 256.0, 279.0, 279.0, 279.0, 0.031248697970917883, 0.03460549169826257, 0.020232311283904836], "isController": false}, {"data": ["saveEmp-266", 3, 0, 0.0, 1366.6666666666665, 241, 3571, 288.0, 3571.0, 3571.0, 3571.0, 0.030825823820141592, 0.03723783600147964, 0.019476863292608997], "isController": false}, {"data": ["saveEmp-265", 3, 0, 0.0, 352.0, 219, 597, 240.0, 597.0, 597.0, 597.0, 0.031327012238419445, 0.034600440275051166, 0.017346109315609207], "isController": false}, {"data": ["saveEmp-264", 3, 0, 0.0, 240.66666666666666, 229, 248, 245.0, 248.0, 248.0, 248.0, 0.03078407026977107, 0.034000765112413164, 0.017045476409140815], "isController": false}, {"data": ["saveEmp-263", 3, 0, 0.0, 1051.6666666666667, 233, 2424, 498.0, 2424.0, 2424.0, 2424.0, 0.031151677517834337, 0.04401999742998661, 0.0192872690881904], "isController": false}, {"data": ["saveEmp-262", 3, 0, 0.0, 253.33333333333334, 239, 262, 259.0, 262.0, 262.0, 262.0, 0.030833110649756423, 0.03640354567925343, 0.016711305088491026], "isController": false}, {"data": ["saveEmp-261", 3, 0, 0.0, 214.0, 203, 232, 207.0, 232.0, 232.0, 232.0, 0.030861657476750886, 0.17606816697185418, 0.016666500570940664], "isController": false}, {"data": ["saveEmp-260", 3, 0, 0.0, 314.3333333333333, 287, 368, 288.0, 368.0, 368.0, 368.0, 0.03131622075847887, 0.5324980818814785, 0.016881400252617515], "isController": false}, {"data": ["screenJob-280", 3, 0, 0.0, 224.33333333333334, 219, 233, 221.0, 233.0, 233.0, 233.0, 0.032607986782896024, 0.03595157917762658, 0.02079396032151475], "isController": false}, {"data": ["screenJob-281", 3, 0, 0.0, 235.33333333333334, 225, 245, 236.0, 245.0, 245.0, 245.0, 0.03260692353676431, 0.04114076680615184, 0.018150338296831693], "isController": false}, {"data": ["saveJob", 3, 0, 0.0, 487.6666666666667, 477, 507, 479.0, 507.0, 507.0, 507.0, 0.03252490865921485, 0.08683896511161465, 0.045388764134783224], "isController": true}, {"data": ["logOut-285", 1, 0, 0.0, 678.0, 678, 678, 678.0, 678.0, 678.0, 678.0, 1.4749262536873156, 9.000795077433628, 1.7874838679941], "isController": false}, {"data": ["logOut-286", 1, 0, 0.0, 241.0, 241, 241, 241.0, 241.0, 241.0, 241.0, 4.149377593360996, 18.153526970954356, 2.617673755186722], "isController": false}, {"data": ["navigateToAddEmp-249", 3, 0, 0.0, 310.6666666666667, 278, 359, 295.0, 359.0, 359.0, 359.0, 0.02994101619808976, 0.39159184531472996, 0.015467575750770981], "isController": false}, {"data": ["logOut-287", 1, 0, 0.0, 559.0, 559, 559, 559.0, 559.0, 559.0, 559.0, 1.7889087656529516, 177.66624273255812, 0.9398758944543827], "isController": false}, {"data": ["navigateToAddEmp-248", 3, 0, 0.0, 293.0, 287, 297, 295.0, 297.0, 297.0, 297.0, 0.029943406960844007, 0.2037555270538682, 0.01734027375759814], "isController": false}, {"data": ["navigateToAddEmp-246", 3, 0, 0.0, 503.6666666666667, 460, 542, 509.0, 542.0, 542.0, 542.0, 0.029879882870859145, 2.9687686749267943, 0.01584450820202785], "isController": false}, {"data": ["navigateToAddEmp-245", 3, 0, 0.0, 299.0, 259, 340, 298.0, 340.0, 340.0, 340.0, 0.02991533958896323, 0.24636333862668647, 0.018697087243102022], "isController": false}, {"data": ["navigateToPim", 3, 0, 0.0, 2635.0, 2598, 2655, 2652.0, 2655.0, 2655.0, 2655.0, 0.029216700265871972, 4.645122469712021, 0.15778159420925], "isController": true}, {"data": ["saveEmp", 3, 0, 0.0, 8200.333333333334, 4687, 11211, 8703.0, 11211.0, 11211.0, 11211.0, 0.02868343053829238, 4.819292520197916, 0.27435066390190266], "isController": true}, {"data": ["saveEmp-259", 3, 0, 0.0, 601.6666666666666, 520, 731, 554.0, 731.0, 731.0, 731.0, 0.031029560828282413, 3.083148475802114, 0.017090500299952422], "isController": false}, {"data": ["saveEmp-258", 3, 0, 0.0, 431.3333333333333, 406, 477, 411.0, 477.0, 477.0, 477.0, 0.030773649549678928, 0.7004010511765791, 0.019113321399995897], "isController": false}, {"data": ["saveEmp-257", 3, 0, 0.0, 532.0, 525, 538, 533.0, 538.0, 538.0, 538.0, 0.03093676525182527, 0.04033259922967455, 0.02183297756053294], "isController": false}, {"data": ["saveEmp-256", 3, 0, 0.0, 262.3333333333333, 253, 271, 263.0, 271.0, 271.0, 271.0, 0.031116458532132928, 0.03673808434116085, 0.021939534238476537], "isController": false}, {"data": ["saveEmp-255", 3, 0, 0.0, 643.3333333333334, 261, 1339, 330.0, 1339.0, 1339.0, 1339.0, 0.030347478630317132, 0.033044373703909766, 0.020083471372211826], "isController": false}, {"data": ["saveLogin-220-0", 1, 0, 0.0, 544.0, 544, 544, 544.0, 544.0, 544.0, 544.0, 1.838235294117647, 3.2061408547794117, 1.6533346737132353], "isController": false}, {"data": ["saveLogin-220-1", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 26.2852381993007, 2.4926245629370634], "isController": false}, {"data": ["navigateToPim-238", 3, 0, 0.0, 267.3333333333333, 266, 270, 266.0, 270.0, 270.0, 270.0, 0.029938327046284654, 0.24547089246152926, 0.018711454403927907], "isController": false}, {"data": ["navigateToPim-239", 3, 0, 0.0, 539.3333333333334, 505, 607, 506.0, 607.0, 607.0, 607.0, 0.02983708949137708, 2.9644488747687623, 0.015967504923119765], "isController": false}, {"data": ["navigateToPim-237", 3, 0, 0.0, 522.3333333333334, 491, 574, 502.0, 574.0, 574.0, 574.0, 0.02984599466751562, 0.29452517198754424, 0.037220053896892036], "isController": false}, {"data": ["navigateToPim-241", 3, 0, 0.0, 402.3333333333333, 398, 408, 401.0, 408.0, 408.0, 408.0, 0.02987095746375657, 0.4859378578291779, 0.02050711239943444], "isController": false}, {"data": ["navigateToPim-242", 3, 0, 0.0, 225.0, 219, 235, 221.0, 235.0, 235.0, 235.0, 0.02992279917812045, 0.03845547238125636, 0.01805887684773285], "isController": false}, {"data": ["navigateToPim-240", 3, 0, 0.0, 211.66666666666666, 210, 213, 212.0, 213.0, 213.0, 213.0, 0.029924888529790226, 0.5088399991022533, 0.015663808839812072], "isController": false}, {"data": ["screenJob", 3, 0, 0.0, 3140.0, 2808, 3557, 3055.0, 3557.0, 3557.0, 3557.0, 0.03147425406017878, 4.678004447049813, 0.2000336381090268], "isController": true}, {"data": ["navigateToPim-243", 3, 0, 0.0, 236.66666666666666, 230, 246, 234.0, 246.0, 246.0, 246.0, 0.029920113297495686, 0.1376792713455075, 0.01779428613103015], "isController": false}, {"data": ["navigateToPim-244", 3, 0, 0.0, 230.33333333333334, 230, 231, 230.0, 231.0, 231.0, 231.0, 0.02991981489607851, 0.07205299173215782, 0.01750192297143655], "isController": false}, {"data": ["navigateToAddEmp-254", 3, 0, 0.0, 248.33333333333334, 227, 282, 236.0, 282.0, 282.0, 282.0, 0.029961050634175573, 0.032623604938579846, 0.01977897483271747], "isController": false}, {"data": ["logOut-285-0", 1, 0, 0.0, 436.0, 436, 436, 436.0, 436.0, 436.0, 436.0, 2.293577981651376, 3.9443269782110093, 1.332694237385321], "isController": false}, {"data": ["navigateToAddEmp-250", 3, 0, 0.0, 236.66666666666666, 229, 242, 239.0, 242.0, 242.0, 242.0, 0.02997691777331455, 0.03264088214574778, 0.019789449623789684], "isController": false}, {"data": ["navigateToAddEmp", 3, 0, 0.0, 1891.3333333333333, 1832, 1951, 1891.0, 1951.0, 1951.0, 1951.0, 0.02945363506946149, 3.8187615820283733, 0.10518744477443424], "isController": true}, {"data": ["logOut-285-1", 1, 0, 0.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 242.0, 4.132231404958678, 18.110795454545457, 2.606856921487603], "isController": false}, {"data": ["saveLogin-231", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 4.796911168981482, 2.8935185185185186], "isController": false}, {"data": ["saveLogin-230", 1, 0, 0.0, 233.0, 233, 233, 233.0, 233.0, 233.0, 233.0, 4.291845493562231, 5.8468012339055795, 2.552474517167382], "isController": false}, {"data": ["saveLogin-226", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 5.157470703125, 2.34222412109375], "isController": false}, {"data": ["screenJob-273", 3, 0, 0.0, 208.33333333333334, 202, 216, 207.0, 216.0, 216.0, 216.0, 0.032600545515794964, 0.5543366196494355, 0.017414549215956882], "isController": false}, {"data": ["saveLogin-225", 1, 0, 0.0, 250.0, 250, 250, 250.0, 250.0, 250.0, 250.0, 4.0, 4.8515625, 2.33984375], "isController": false}, {"data": ["screenJob-274", 3, 0, 0.0, 206.0, 202, 211, 205.0, 211.0, 211.0, 211.0, 0.032599128516630986, 0.18598057499429516, 0.0174456273702283], "isController": false}, {"data": ["saveLogin-228", 1, 0, 0.0, 239.0, 239, 239, 239.0, 239.0, 239.0, 239.0, 4.184100418410042, 4.596790010460251, 2.541514121338912], "isController": false}, {"data": ["screenJob-271", 3, 0, 0.0, 397.3333333333333, 345, 492, 355.0, 492.0, 492.0, 492.0, 0.03230913379212304, 0.5362558964169171, 0.021202869051080743], "isController": false}, {"data": ["saveLogin-227", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 14.453807910839162, 2.007757867132867], "isController": false}, {"data": ["screenJob-272", 3, 0, 0.0, 630.6666666666666, 430, 968, 494.0, 968.0, 968.0, 968.0, 0.032330721729478075, 3.2115288827849686, 0.01764929047536938], "isController": false}, {"data": ["saveLogin-222", 1, 0, 0.0, 562.0, 562, 562, 562.0, 562.0, 562.0, 562.0, 1.779359430604982, 176.78735264679713, 0.9435470418149465], "isController": false}, {"data": ["screenJob-277", 3, 0, 0.0, 256.6666666666667, 225, 308, 237.0, 308.0, 308.0, 308.0, 0.03259735744089012, 0.03848652846292594, 0.017508346281728097], "isController": false}, {"data": ["saveLogin-221", 1, 0, 0.0, 290.0, 290, 290, 290.0, 290.0, 290.0, 290.0, 3.4482758620689653, 25.922683189655174, 2.1214978448275863], "isController": false}, {"data": ["screenJob-278", 3, 0, 0.0, 257.6666666666667, 222, 313, 238.0, 313.0, 313.0, 313.0, 0.032589566993286544, 0.03551753590283964, 0.02027300212375345], "isController": false}, {"data": ["saveLogin-224", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 8.757686997991968, 2.6355421686746987], "isController": false}, {"data": ["screenJob-275", 3, 0, 0.0, 264.3333333333333, 245, 282, 266.0, 282.0, 282.0, 282.0, 0.032581426414848444, 0.04588126649434712, 0.01985430672154827], "isController": false}, {"data": ["screenJob-276", 3, 0, 0.0, 229.66666666666666, 218, 240, 231.0, 240.0, 240.0, 240.0, 0.03259664906447617, 0.03600274423039311, 0.01788995778733946], "isController": false}, {"data": ["GetLandingPage-219", 1, 0, 0.0, 591.0, 591, 591, 591.0, 591.0, 591.0, 591.0, 1.6920473773265652, 168.05963145093062, 0.8889858291032149], "isController": false}, {"data": ["screenJob-279", 3, 0, 0.0, 229.66666666666666, 217, 241, 231.0, 241.0, 241.0, 241.0, 0.03260089978483406, 0.0926451351307296, 0.01865637429093043], "isController": false}, {"data": ["GetLandingPage-218", 1, 0, 0.0, 1879.0, 1879, 1879, 1879.0, 1879.0, 1879.0, 1879.0, 0.532197977647685, 2.393851450239489, 0.2541453233102714], "isController": false}, {"data": ["saveLogin-229", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 5.736343503937007, 2.333753690944882], "isController": false}, {"data": ["saveEmp-270", 3, 0, 0.0, 344.6666666666667, 275, 479, 280.0, 479.0, 479.0, 479.0, 0.032262574338348365, 0.2197467791196619, 0.01739154397926592], "isController": false}, {"data": ["saveLogin-220", 1, 0, 0.0, 834.0, 834, 834, 834.0, 834.0, 834.0, 834.0, 1.199040767386091, 11.105178357314148, 1.933219049760192], "isController": false}, {"data": ["navigateToPim-237-0", 3, 0, 0.0, 230.33333333333334, 220, 243, 228.0, 243.0, 243.0, 243.0, 0.029924291542397733, 0.049942006099568094, 0.018615013391120466], "isController": false}, {"data": ["navigateToPim-237-1", 3, 0, 0.0, 291.3333333333333, 262, 331, 281.0, 331.0, 331.0, 331.0, 0.029918322978269324, 0.2453068747319817, 0.018698951861418327], "isController": false}, {"data": ["logOut", 1, 0, 0.0, 1478.0, 1478, 1478, 1478.0, 1478.0, 1478.0, 1478.0, 0.6765899864682003, 74.28482324086603, 1.6022760910013532], "isController": true}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 155, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
