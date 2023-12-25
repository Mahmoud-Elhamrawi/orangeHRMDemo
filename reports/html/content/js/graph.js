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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 200.0, "maxY": 3.0, "series": [{"data": [[200.0, 3.0]], "isOverall": false, "label": "saveJob-284", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "saveJob-283", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "saveLogin", "isController": true}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "saveEmp-269", "isController": false}, {"data": [[2400.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "saveEmp-268", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "GetLandingPage", "isController": true}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "saveEmp-267", "isController": false}, {"data": [[200.0, 2.0], [3500.0, 1.0]], "isOverall": false, "label": "saveEmp-266", "isController": false}, {"data": [[200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "saveEmp-265", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "saveEmp-264", "isController": false}, {"data": [[2400.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "saveEmp-263", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "saveEmp-262", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "saveEmp-261", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "saveEmp-260", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-280", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-281", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "saveJob", "isController": true}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "logOut-285", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "logOut-286", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "navigateToAddEmp-249", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "logOut-287", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToAddEmp-248", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "navigateToAddEmp-246", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "navigateToAddEmp-245", "isController": false}, {"data": [[2500.0, 1.0], [2600.0, 2.0]], "isOverall": false, "label": "navigateToPim", "isController": true}, {"data": [[8700.0, 1.0], [4600.0, 1.0], [11200.0, 1.0]], "isOverall": false, "label": "saveEmp", "isController": true}, {"data": [[700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "saveEmp-259", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "saveEmp-258", "isController": false}, {"data": [[500.0, 3.0]], "isOverall": false, "label": "saveEmp-257", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "saveEmp-256", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "saveEmp-255", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "saveLogin-220-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-220-1", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToPim-238", "isController": false}, {"data": [[600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "navigateToPim-239", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "navigateToPim-237", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "navigateToPim-241", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToPim-242", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToPim-240", "isController": false}, {"data": [[2800.0, 1.0], [3000.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "screenJob", "isController": true}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToPim-243", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToPim-244", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToAddEmp-254", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "logOut-285-0", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToAddEmp-250", "isController": false}, {"data": [[1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "navigateToAddEmp", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "logOut-285-1", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-231", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-230", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-226", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-273", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-225", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-274", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-228", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "screenJob-271", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-227", "isController": false}, {"data": [[400.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "screenJob-272", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "saveLogin-222", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "screenJob-277", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-221", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "screenJob-278", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-224", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-275", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-276", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "GetLandingPage-219", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "screenJob-279", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "GetLandingPage-218", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "saveLogin-229", "isController": false}, {"data": [[400.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "saveEmp-270", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "saveLogin-220", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "navigateToPim-237-0", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "navigateToPim-237-1", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "logOut", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 11200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 129.0, "series": [{"data": [[0.0, 129.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 22.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 4.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.7034942E12, "maxY": 1.0, "series": [{"data": [[1.70349432E12, 1.0], [1.70349438E12, 1.0], [1.7034942E12, 1.0], [1.70349426E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.70349438E12, 1.0]], "isOverall": false, "label": "tearDown Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70349438E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 206.0, "minX": 1.0, "maxY": 8200.333333333334, "series": [{"data": [[1.0, 238.0]], "isOverall": false, "label": "saveJob-284", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "saveJob-284-Aggregated", "isController": false}, {"data": [[1.0, 249.66666666666666]], "isOverall": false, "label": "saveJob-283", "isController": false}, {"data": [[1.0, 249.66666666666666]], "isOverall": false, "label": "saveJob-283-Aggregated", "isController": false}, {"data": [[1.0, 3669.0]], "isOverall": false, "label": "saveLogin", "isController": true}, {"data": [[1.0, 3669.0]], "isOverall": false, "label": "saveLogin-Aggregated", "isController": true}, {"data": [[1.0, 268.6666666666667]], "isOverall": false, "label": "saveEmp-269", "isController": false}, {"data": [[1.0, 268.6666666666667]], "isOverall": false, "label": "saveEmp-269-Aggregated", "isController": false}, {"data": [[1.0, 1073.3333333333333]], "isOverall": false, "label": "saveEmp-268", "isController": false}, {"data": [[1.0, 1073.3333333333333]], "isOverall": false, "label": "saveEmp-268-Aggregated", "isController": false}, {"data": [[1.0, 2470.0]], "isOverall": false, "label": "GetLandingPage", "isController": true}, {"data": [[1.0, 2470.0]], "isOverall": false, "label": "GetLandingPage-Aggregated", "isController": true}, {"data": [[1.0, 250.33333333333334]], "isOverall": false, "label": "saveEmp-267", "isController": false}, {"data": [[1.0, 250.33333333333334]], "isOverall": false, "label": "saveEmp-267-Aggregated", "isController": false}, {"data": [[1.0, 1366.6666666666665]], "isOverall": false, "label": "saveEmp-266", "isController": false}, {"data": [[1.0, 1366.6666666666665]], "isOverall": false, "label": "saveEmp-266-Aggregated", "isController": false}, {"data": [[1.0, 352.0]], "isOverall": false, "label": "saveEmp-265", "isController": false}, {"data": [[1.0, 352.0]], "isOverall": false, "label": "saveEmp-265-Aggregated", "isController": false}, {"data": [[1.0, 240.66666666666666]], "isOverall": false, "label": "saveEmp-264", "isController": false}, {"data": [[1.0, 240.66666666666666]], "isOverall": false, "label": "saveEmp-264-Aggregated", "isController": false}, {"data": [[1.0, 1051.6666666666667]], "isOverall": false, "label": "saveEmp-263", "isController": false}, {"data": [[1.0, 1051.6666666666667]], "isOverall": false, "label": "saveEmp-263-Aggregated", "isController": false}, {"data": [[1.0, 253.33333333333334]], "isOverall": false, "label": "saveEmp-262", "isController": false}, {"data": [[1.0, 253.33333333333334]], "isOverall": false, "label": "saveEmp-262-Aggregated", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "saveEmp-261", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "saveEmp-261-Aggregated", "isController": false}, {"data": [[1.0, 314.3333333333333]], "isOverall": false, "label": "saveEmp-260", "isController": false}, {"data": [[1.0, 314.3333333333333]], "isOverall": false, "label": "saveEmp-260-Aggregated", "isController": false}, {"data": [[1.0, 224.33333333333334]], "isOverall": false, "label": "screenJob-280", "isController": false}, {"data": [[1.0, 224.33333333333334]], "isOverall": false, "label": "screenJob-280-Aggregated", "isController": false}, {"data": [[1.0, 235.33333333333334]], "isOverall": false, "label": "screenJob-281", "isController": false}, {"data": [[1.0, 235.33333333333334]], "isOverall": false, "label": "screenJob-281-Aggregated", "isController": false}, {"data": [[1.0, 487.6666666666667]], "isOverall": false, "label": "saveJob", "isController": true}, {"data": [[1.0, 487.6666666666667]], "isOverall": false, "label": "saveJob-Aggregated", "isController": true}, {"data": [[1.0, 678.0]], "isOverall": false, "label": "logOut-285", "isController": false}, {"data": [[1.0, 678.0]], "isOverall": false, "label": "logOut-285-Aggregated", "isController": false}, {"data": [[1.0, 241.0]], "isOverall": false, "label": "logOut-286", "isController": false}, {"data": [[1.0, 241.0]], "isOverall": false, "label": "logOut-286-Aggregated", "isController": false}, {"data": [[1.0, 310.6666666666667]], "isOverall": false, "label": "navigateToAddEmp-249", "isController": false}, {"data": [[1.0, 310.6666666666667]], "isOverall": false, "label": "navigateToAddEmp-249-Aggregated", "isController": false}, {"data": [[1.0, 559.0]], "isOverall": false, "label": "logOut-287", "isController": false}, {"data": [[1.0, 559.0]], "isOverall": false, "label": "logOut-287-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "navigateToAddEmp-248", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "navigateToAddEmp-248-Aggregated", "isController": false}, {"data": [[1.0, 503.6666666666667]], "isOverall": false, "label": "navigateToAddEmp-246", "isController": false}, {"data": [[1.0, 503.6666666666667]], "isOverall": false, "label": "navigateToAddEmp-246-Aggregated", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "navigateToAddEmp-245", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "navigateToAddEmp-245-Aggregated", "isController": false}, {"data": [[1.0, 2635.0]], "isOverall": false, "label": "navigateToPim", "isController": true}, {"data": [[1.0, 2635.0]], "isOverall": false, "label": "navigateToPim-Aggregated", "isController": true}, {"data": [[1.0, 8200.333333333334]], "isOverall": false, "label": "saveEmp", "isController": true}, {"data": [[1.0, 8200.333333333334]], "isOverall": false, "label": "saveEmp-Aggregated", "isController": true}, {"data": [[1.0, 601.6666666666666]], "isOverall": false, "label": "saveEmp-259", "isController": false}, {"data": [[1.0, 601.6666666666666]], "isOverall": false, "label": "saveEmp-259-Aggregated", "isController": false}, {"data": [[1.0, 431.3333333333333]], "isOverall": false, "label": "saveEmp-258", "isController": false}, {"data": [[1.0, 431.3333333333333]], "isOverall": false, "label": "saveEmp-258-Aggregated", "isController": false}, {"data": [[1.0, 532.0]], "isOverall": false, "label": "saveEmp-257", "isController": false}, {"data": [[1.0, 532.0]], "isOverall": false, "label": "saveEmp-257-Aggregated", "isController": false}, {"data": [[1.0, 262.3333333333333]], "isOverall": false, "label": "saveEmp-256", "isController": false}, {"data": [[1.0, 262.3333333333333]], "isOverall": false, "label": "saveEmp-256-Aggregated", "isController": false}, {"data": [[1.0, 643.3333333333334]], "isOverall": false, "label": "saveEmp-255", "isController": false}, {"data": [[1.0, 643.3333333333334]], "isOverall": false, "label": "saveEmp-255-Aggregated", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "saveLogin-220-0", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "saveLogin-220-0-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "saveLogin-220-1", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "saveLogin-220-1-Aggregated", "isController": false}, {"data": [[1.0, 267.3333333333333]], "isOverall": false, "label": "navigateToPim-238", "isController": false}, {"data": [[1.0, 267.3333333333333]], "isOverall": false, "label": "navigateToPim-238-Aggregated", "isController": false}, {"data": [[1.0, 539.3333333333334]], "isOverall": false, "label": "navigateToPim-239", "isController": false}, {"data": [[1.0, 539.3333333333334]], "isOverall": false, "label": "navigateToPim-239-Aggregated", "isController": false}, {"data": [[1.0, 522.3333333333334]], "isOverall": false, "label": "navigateToPim-237", "isController": false}, {"data": [[1.0, 522.3333333333334]], "isOverall": false, "label": "navigateToPim-237-Aggregated", "isController": false}, {"data": [[1.0, 402.3333333333333]], "isOverall": false, "label": "navigateToPim-241", "isController": false}, {"data": [[1.0, 402.3333333333333]], "isOverall": false, "label": "navigateToPim-241-Aggregated", "isController": false}, {"data": [[1.0, 225.0]], "isOverall": false, "label": "navigateToPim-242", "isController": false}, {"data": [[1.0, 225.0]], "isOverall": false, "label": "navigateToPim-242-Aggregated", "isController": false}, {"data": [[1.0, 211.66666666666666]], "isOverall": false, "label": "navigateToPim-240", "isController": false}, {"data": [[1.0, 211.66666666666666]], "isOverall": false, "label": "navigateToPim-240-Aggregated", "isController": false}, {"data": [[1.0, 3140.0]], "isOverall": false, "label": "screenJob", "isController": true}, {"data": [[1.0, 3140.0]], "isOverall": false, "label": "screenJob-Aggregated", "isController": true}, {"data": [[1.0, 236.66666666666666]], "isOverall": false, "label": "navigateToPim-243", "isController": false}, {"data": [[1.0, 236.66666666666666]], "isOverall": false, "label": "navigateToPim-243-Aggregated", "isController": false}, {"data": [[1.0, 230.33333333333334]], "isOverall": false, "label": "navigateToPim-244", "isController": false}, {"data": [[1.0, 230.33333333333334]], "isOverall": false, "label": "navigateToPim-244-Aggregated", "isController": false}, {"data": [[1.0, 248.33333333333334]], "isOverall": false, "label": "navigateToAddEmp-254", "isController": false}, {"data": [[1.0, 248.33333333333334]], "isOverall": false, "label": "navigateToAddEmp-254-Aggregated", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "logOut-285-0", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "logOut-285-0-Aggregated", "isController": false}, {"data": [[1.0, 236.66666666666666]], "isOverall": false, "label": "navigateToAddEmp-250", "isController": false}, {"data": [[1.0, 236.66666666666666]], "isOverall": false, "label": "navigateToAddEmp-250-Aggregated", "isController": false}, {"data": [[1.0, 1891.3333333333333]], "isOverall": false, "label": "navigateToAddEmp", "isController": true}, {"data": [[1.0, 1891.3333333333333]], "isOverall": false, "label": "navigateToAddEmp-Aggregated", "isController": true}, {"data": [[1.0, 242.0]], "isOverall": false, "label": "logOut-285-1", "isController": false}, {"data": [[1.0, 242.0]], "isOverall": false, "label": "logOut-285-1-Aggregated", "isController": false}, {"data": [[1.0, 216.0]], "isOverall": false, "label": "saveLogin-231", "isController": false}, {"data": [[1.0, 216.0]], "isOverall": false, "label": "saveLogin-231-Aggregated", "isController": false}, {"data": [[1.0, 233.0]], "isOverall": false, "label": "saveLogin-230", "isController": false}, {"data": [[1.0, 233.0]], "isOverall": false, "label": "saveLogin-230-Aggregated", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "saveLogin-226", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "saveLogin-226-Aggregated", "isController": false}, {"data": [[1.0, 208.33333333333334]], "isOverall": false, "label": "screenJob-273", "isController": false}, {"data": [[1.0, 208.33333333333334]], "isOverall": false, "label": "screenJob-273-Aggregated", "isController": false}, {"data": [[1.0, 250.0]], "isOverall": false, "label": "saveLogin-225", "isController": false}, {"data": [[1.0, 250.0]], "isOverall": false, "label": "saveLogin-225-Aggregated", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "screenJob-274", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "screenJob-274-Aggregated", "isController": false}, {"data": [[1.0, 239.0]], "isOverall": false, "label": "saveLogin-228", "isController": false}, {"data": [[1.0, 239.0]], "isOverall": false, "label": "saveLogin-228-Aggregated", "isController": false}, {"data": [[1.0, 397.3333333333333]], "isOverall": false, "label": "screenJob-271", "isController": false}, {"data": [[1.0, 397.3333333333333]], "isOverall": false, "label": "screenJob-271-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "saveLogin-227", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "saveLogin-227-Aggregated", "isController": false}, {"data": [[1.0, 630.6666666666666]], "isOverall": false, "label": "screenJob-272", "isController": false}, {"data": [[1.0, 630.6666666666666]], "isOverall": false, "label": "screenJob-272-Aggregated", "isController": false}, {"data": [[1.0, 562.0]], "isOverall": false, "label": "saveLogin-222", "isController": false}, {"data": [[1.0, 562.0]], "isOverall": false, "label": "saveLogin-222-Aggregated", "isController": false}, {"data": [[1.0, 256.6666666666667]], "isOverall": false, "label": "screenJob-277", "isController": false}, {"data": [[1.0, 256.6666666666667]], "isOverall": false, "label": "screenJob-277-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "saveLogin-221", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "saveLogin-221-Aggregated", "isController": false}, {"data": [[1.0, 257.6666666666667]], "isOverall": false, "label": "screenJob-278", "isController": false}, {"data": [[1.0, 257.6666666666667]], "isOverall": false, "label": "screenJob-278-Aggregated", "isController": false}, {"data": [[1.0, 249.0]], "isOverall": false, "label": "saveLogin-224", "isController": false}, {"data": [[1.0, 249.0]], "isOverall": false, "label": "saveLogin-224-Aggregated", "isController": false}, {"data": [[1.0, 264.3333333333333]], "isOverall": false, "label": "screenJob-275", "isController": false}, {"data": [[1.0, 264.3333333333333]], "isOverall": false, "label": "screenJob-275-Aggregated", "isController": false}, {"data": [[1.0, 229.66666666666666]], "isOverall": false, "label": "screenJob-276", "isController": false}, {"data": [[1.0, 229.66666666666666]], "isOverall": false, "label": "screenJob-276-Aggregated", "isController": false}, {"data": [[1.0, 591.0]], "isOverall": false, "label": "GetLandingPage-219", "isController": false}, {"data": [[1.0, 591.0]], "isOverall": false, "label": "GetLandingPage-219-Aggregated", "isController": false}, {"data": [[1.0, 229.66666666666666]], "isOverall": false, "label": "screenJob-279", "isController": false}, {"data": [[1.0, 229.66666666666666]], "isOverall": false, "label": "screenJob-279-Aggregated", "isController": false}, {"data": [[1.0, 1879.0]], "isOverall": false, "label": "GetLandingPage-218", "isController": false}, {"data": [[1.0, 1879.0]], "isOverall": false, "label": "GetLandingPage-218-Aggregated", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "saveLogin-229", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "saveLogin-229-Aggregated", "isController": false}, {"data": [[1.0, 344.6666666666667]], "isOverall": false, "label": "saveEmp-270", "isController": false}, {"data": [[1.0, 344.6666666666667]], "isOverall": false, "label": "saveEmp-270-Aggregated", "isController": false}, {"data": [[1.0, 834.0]], "isOverall": false, "label": "saveLogin-220", "isController": false}, {"data": [[1.0, 834.0]], "isOverall": false, "label": "saveLogin-220-Aggregated", "isController": false}, {"data": [[1.0, 230.33333333333334]], "isOverall": false, "label": "navigateToPim-237-0", "isController": false}, {"data": [[1.0, 230.33333333333334]], "isOverall": false, "label": "navigateToPim-237-0-Aggregated", "isController": false}, {"data": [[1.0, 291.3333333333333]], "isOverall": false, "label": "navigateToPim-237-1", "isController": false}, {"data": [[1.0, 291.3333333333333]], "isOverall": false, "label": "navigateToPim-237-1-Aggregated", "isController": false}, {"data": [[1.0, 1478.0]], "isOverall": false, "label": "logOut", "isController": true}, {"data": [[1.0, 1478.0]], "isOverall": false, "label": "logOut-Aggregated", "isController": true}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 84.91666666666667, "minX": 1.7034942E12, "maxY": 13358.533333333333, "series": [{"data": [[1.70349432E12, 13358.533333333333], [1.70349438E12, 2023.5166666666667], [1.7034942E12, 11386.95], [1.70349426E12, 10989.166666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70349432E12, 639.6666666666666], [1.70349438E12, 84.91666666666667], [1.7034942E12, 404.0], [1.70349426E12, 516.5]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70349438E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 203.0, "minX": 1.7034942E12, "maxY": 11211.0, "series": [{"data": [[1.70349432E12, 237.0], [1.70349438E12, 233.0], [1.70349426E12, 244.0]], "isOverall": false, "label": "saveJob-284", "isController": false}, {"data": [[1.70349432E12, 242.0], [1.70349438E12, 244.0], [1.70349426E12, 263.0]], "isOverall": false, "label": "saveJob-283", "isController": false}, {"data": [[1.7034942E12, 3669.0]], "isOverall": false, "label": "saveLogin", "isController": true}, {"data": [[1.70349432E12, 279.0], [1.70349426E12, 248.0]], "isOverall": false, "label": "saveEmp-269", "isController": false}, {"data": [[1.70349432E12, 362.0], [1.70349426E12, 2496.0]], "isOverall": false, "label": "saveEmp-268", "isController": false}, {"data": [[1.7034942E12, 2470.0]], "isOverall": false, "label": "GetLandingPage", "isController": true}, {"data": [[1.70349432E12, 236.0], [1.70349426E12, 279.0]], "isOverall": false, "label": "saveEmp-267", "isController": false}, {"data": [[1.70349432E12, 1906.0], [1.70349426E12, 288.0]], "isOverall": false, "label": "saveEmp-266", "isController": false}, {"data": [[1.70349432E12, 219.0], [1.70349426E12, 418.5]], "isOverall": false, "label": "saveEmp-265", "isController": false}, {"data": [[1.70349432E12, 229.0], [1.70349426E12, 246.5]], "isOverall": false, "label": "saveEmp-264", "isController": false}, {"data": [[1.70349432E12, 1328.5], [1.70349426E12, 498.0]], "isOverall": false, "label": "saveEmp-263", "isController": false}, {"data": [[1.70349432E12, 239.0], [1.70349426E12, 260.5]], "isOverall": false, "label": "saveEmp-262", "isController": false}, {"data": [[1.70349432E12, 203.0], [1.70349426E12, 219.5]], "isOverall": false, "label": "saveEmp-261", "isController": false}, {"data": [[1.70349432E12, 287.0], [1.70349426E12, 328.0]], "isOverall": false, "label": "saveEmp-260", "isController": false}, {"data": [[1.70349432E12, 220.0], [1.70349426E12, 233.0]], "isOverall": false, "label": "screenJob-280", "isController": false}, {"data": [[1.70349432E12, 230.5], [1.70349426E12, 245.0]], "isOverall": false, "label": "screenJob-281", "isController": false}, {"data": [[1.70349432E12, 479.0], [1.70349438E12, 477.0], [1.70349426E12, 507.0]], "isOverall": false, "label": "saveJob", "isController": true}, {"data": [[1.70349438E12, 678.0]], "isOverall": false, "label": "logOut-285", "isController": false}, {"data": [[1.70349438E12, 241.0]], "isOverall": false, "label": "logOut-286", "isController": false}, {"data": [[1.70349432E12, 295.0], [1.7034942E12, 359.0], [1.70349426E12, 278.0]], "isOverall": false, "label": "navigateToAddEmp-249", "isController": false}, {"data": [[1.70349438E12, 559.0]], "isOverall": false, "label": "logOut-287", "isController": false}, {"data": [[1.70349432E12, 297.0], [1.7034942E12, 287.0], [1.70349426E12, 295.0]], "isOverall": false, "label": "navigateToAddEmp-248", "isController": false}, {"data": [[1.70349432E12, 460.0], [1.7034942E12, 509.0], [1.70349426E12, 542.0]], "isOverall": false, "label": "navigateToAddEmp-246", "isController": false}, {"data": [[1.70349432E12, 259.0], [1.7034942E12, 340.0], [1.70349426E12, 298.0]], "isOverall": false, "label": "navigateToAddEmp-245", "isController": false}, {"data": [[1.70349432E12, 2655.0], [1.7034942E12, 2652.0], [1.70349426E12, 2598.0]], "isOverall": false, "label": "navigateToPim", "isController": true}, {"data": [[1.70349432E12, 4687.0], [1.7034942E12, 8703.0], [1.70349426E12, 11211.0]], "isOverall": false, "label": "saveEmp", "isController": true}, {"data": [[1.70349432E12, 520.0], [1.7034942E12, 554.0], [1.70349426E12, 731.0]], "isOverall": false, "label": "saveEmp-259", "isController": false}, {"data": [[1.70349432E12, 411.0], [1.7034942E12, 406.0], [1.70349426E12, 477.0]], "isOverall": false, "label": "saveEmp-258", "isController": false}, {"data": [[1.70349432E12, 525.0], [1.7034942E12, 538.0], [1.70349426E12, 533.0]], "isOverall": false, "label": "saveEmp-257", "isController": false}, {"data": [[1.70349432E12, 271.0], [1.7034942E12, 253.0], [1.70349426E12, 263.0]], "isOverall": false, "label": "saveEmp-256", "isController": false}, {"data": [[1.70349432E12, 330.0], [1.7034942E12, 1339.0], [1.70349426E12, 261.0]], "isOverall": false, "label": "saveEmp-255", "isController": false}, {"data": [[1.7034942E12, 544.0]], "isOverall": false, "label": "saveLogin-220-0", "isController": false}, {"data": [[1.7034942E12, 286.0]], "isOverall": false, "label": "saveLogin-220-1", "isController": false}, {"data": [[1.70349432E12, 266.0], [1.7034942E12, 266.0], [1.70349426E12, 270.0]], "isOverall": false, "label": "navigateToPim-238", "isController": false}, {"data": [[1.70349432E12, 607.0], [1.7034942E12, 506.0], [1.70349426E12, 505.0]], "isOverall": false, "label": "navigateToPim-239", "isController": false}, {"data": [[1.70349432E12, 491.0], [1.7034942E12, 574.0], [1.70349426E12, 502.0]], "isOverall": false, "label": "navigateToPim-237", "isController": false}, {"data": [[1.70349432E12, 401.0], [1.7034942E12, 408.0], [1.70349426E12, 398.0]], "isOverall": false, "label": "navigateToPim-241", "isController": false}, {"data": [[1.70349432E12, 219.0], [1.7034942E12, 221.0], [1.70349426E12, 235.0]], "isOverall": false, "label": "navigateToPim-242", "isController": false}, {"data": [[1.70349432E12, 210.0], [1.7034942E12, 213.0], [1.70349426E12, 212.0]], "isOverall": false, "label": "navigateToPim-240", "isController": false}, {"data": [[1.70349432E12, 2931.5], [1.70349426E12, 3557.0]], "isOverall": false, "label": "screenJob", "isController": true}, {"data": [[1.70349432E12, 230.0], [1.7034942E12, 234.0], [1.70349426E12, 246.0]], "isOverall": false, "label": "navigateToPim-243", "isController": false}, {"data": [[1.70349432E12, 231.0], [1.7034942E12, 230.0], [1.70349426E12, 230.0]], "isOverall": false, "label": "navigateToPim-244", "isController": false}, {"data": [[1.70349432E12, 282.0], [1.7034942E12, 227.0], [1.70349426E12, 236.0]], "isOverall": false, "label": "navigateToAddEmp-254", "isController": false}, {"data": [[1.70349438E12, 436.0]], "isOverall": false, "label": "logOut-285-0", "isController": false}, {"data": [[1.70349432E12, 239.0], [1.7034942E12, 229.0], [1.70349426E12, 242.0]], "isOverall": false, "label": "navigateToAddEmp-250", "isController": false}, {"data": [[1.70349432E12, 1832.0], [1.7034942E12, 1951.0], [1.70349426E12, 1891.0]], "isOverall": false, "label": "navigateToAddEmp", "isController": true}, {"data": [[1.70349438E12, 242.0]], "isOverall": false, "label": "logOut-285-1", "isController": false}, {"data": [[1.7034942E12, 216.0]], "isOverall": false, "label": "saveLogin-231", "isController": false}, {"data": [[1.7034942E12, 233.0]], "isOverall": false, "label": "saveLogin-230", "isController": false}, {"data": [[1.7034942E12, 256.0]], "isOverall": false, "label": "saveLogin-226", "isController": false}, {"data": [[1.70349432E12, 204.5], [1.70349426E12, 216.0]], "isOverall": false, "label": "screenJob-273", "isController": false}, {"data": [[1.7034942E12, 250.0]], "isOverall": false, "label": "saveLogin-225", "isController": false}, {"data": [[1.70349432E12, 203.5], [1.70349426E12, 211.0]], "isOverall": false, "label": "screenJob-274", "isController": false}, {"data": [[1.7034942E12, 239.0]], "isOverall": false, "label": "saveLogin-228", "isController": false}, {"data": [[1.70349432E12, 350.0], [1.70349426E12, 492.0]], "isOverall": false, "label": "screenJob-271", "isController": false}, {"data": [[1.7034942E12, 286.0]], "isOverall": false, "label": "saveLogin-227", "isController": false}, {"data": [[1.70349432E12, 462.0], [1.70349426E12, 968.0]], "isOverall": false, "label": "screenJob-272", "isController": false}, {"data": [[1.7034942E12, 562.0]], "isOverall": false, "label": "saveLogin-222", "isController": false}, {"data": [[1.70349432E12, 266.5], [1.70349426E12, 237.0]], "isOverall": false, "label": "screenJob-277", "isController": false}, {"data": [[1.7034942E12, 290.0]], "isOverall": false, "label": "saveLogin-221", "isController": false}, {"data": [[1.70349432E12, 267.5], [1.70349426E12, 238.0]], "isOverall": false, "label": "screenJob-278", "isController": false}, {"data": [[1.7034942E12, 249.0]], "isOverall": false, "label": "saveLogin-224", "isController": false}, {"data": [[1.70349432E12, 274.0], [1.70349426E12, 245.0]], "isOverall": false, "label": "screenJob-275", "isController": false}, {"data": [[1.70349432E12, 229.0], [1.70349426E12, 231.0]], "isOverall": false, "label": "screenJob-276", "isController": false}, {"data": [[1.7034942E12, 591.0]], "isOverall": false, "label": "GetLandingPage-219", "isController": false}, {"data": [[1.70349432E12, 224.0], [1.70349426E12, 241.0]], "isOverall": false, "label": "screenJob-279", "isController": false}, {"data": [[1.7034942E12, 1879.0]], "isOverall": false, "label": "GetLandingPage-218", "isController": false}, {"data": [[1.7034942E12, 254.0]], "isOverall": false, "label": "saveLogin-229", "isController": false}, {"data": [[1.70349432E12, 277.5], [1.70349426E12, 479.0]], "isOverall": false, "label": "saveEmp-270", "isController": false}, {"data": [[1.7034942E12, 834.0]], "isOverall": false, "label": "saveLogin-220", "isController": false}, {"data": [[1.70349432E12, 228.0], [1.7034942E12, 243.0], [1.70349426E12, 220.0]], "isOverall": false, "label": "navigateToPim-237-0", "isController": false}, {"data": [[1.70349432E12, 262.0], [1.7034942E12, 331.0], [1.70349426E12, 281.0]], "isOverall": false, "label": "navigateToPim-237-1", "isController": false}, {"data": [[1.70349438E12, 1478.0]], "isOverall": false, "label": "logOut", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70349438E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7034942E12, "maxY": 2496.0, "series": [{"data": [[1.70349432E12, 237.0], [1.70349438E12, 232.0], [1.70349426E12, 243.0]], "isOverall": false, "label": "saveJob-284", "isController": false}, {"data": [[1.70349432E12, 242.0], [1.70349438E12, 244.0], [1.70349426E12, 263.0]], "isOverall": false, "label": "saveJob-283", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin", "isController": true}, {"data": [[1.70349432E12, 278.5], [1.70349426E12, 248.0]], "isOverall": false, "label": "saveEmp-269", "isController": false}, {"data": [[1.70349432E12, 362.0], [1.70349426E12, 2496.0]], "isOverall": false, "label": "saveEmp-268", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "GetLandingPage", "isController": true}, {"data": [[1.70349432E12, 236.0], [1.70349426E12, 278.0]], "isOverall": false, "label": "saveEmp-267", "isController": false}, {"data": [[1.70349432E12, 1906.0], [1.70349426E12, 287.0]], "isOverall": false, "label": "saveEmp-266", "isController": false}, {"data": [[1.70349432E12, 219.0], [1.70349426E12, 418.0]], "isOverall": false, "label": "saveEmp-265", "isController": false}, {"data": [[1.70349432E12, 229.0], [1.70349426E12, 246.5]], "isOverall": false, "label": "saveEmp-264", "isController": false}, {"data": [[1.70349432E12, 1328.0], [1.70349426E12, 498.0]], "isOverall": false, "label": "saveEmp-263", "isController": false}, {"data": [[1.70349432E12, 239.0], [1.70349426E12, 260.5]], "isOverall": false, "label": "saveEmp-262", "isController": false}, {"data": [[1.70349432E12, 203.0], [1.70349426E12, 219.5]], "isOverall": false, "label": "saveEmp-261", "isController": false}, {"data": [[1.70349432E12, 287.0], [1.70349426E12, 327.5]], "isOverall": false, "label": "saveEmp-260", "isController": false}, {"data": [[1.70349432E12, 220.0], [1.70349426E12, 233.0]], "isOverall": false, "label": "screenJob-280", "isController": false}, {"data": [[1.70349432E12, 230.5], [1.70349426E12, 245.0]], "isOverall": false, "label": "screenJob-281", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349438E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveJob", "isController": true}, {"data": [[1.70349438E12, 436.0]], "isOverall": false, "label": "logOut-285", "isController": false}, {"data": [[1.70349438E12, 241.0]], "isOverall": false, "label": "logOut-286", "isController": false}, {"data": [[1.70349432E12, 295.0], [1.7034942E12, 358.0], [1.70349426E12, 278.0]], "isOverall": false, "label": "navigateToAddEmp-249", "isController": false}, {"data": [[1.70349438E12, 297.0]], "isOverall": false, "label": "logOut-287", "isController": false}, {"data": [[1.70349432E12, 297.0], [1.7034942E12, 287.0], [1.70349426E12, 295.0]], "isOverall": false, "label": "navigateToAddEmp-248", "isController": false}, {"data": [[1.70349432E12, 207.0], [1.7034942E12, 208.0], [1.70349426E12, 222.0]], "isOverall": false, "label": "navigateToAddEmp-246", "isController": false}, {"data": [[1.70349432E12, 259.0], [1.7034942E12, 340.0], [1.70349426E12, 298.0]], "isOverall": false, "label": "navigateToAddEmp-245", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim", "isController": true}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp", "isController": true}, {"data": [[1.70349432E12, 297.0], [1.7034942E12, 314.0], [1.70349426E12, 322.0]], "isOverall": false, "label": "saveEmp-259", "isController": false}, {"data": [[1.70349432E12, 410.0], [1.7034942E12, 402.0], [1.70349426E12, 474.0]], "isOverall": false, "label": "saveEmp-258", "isController": false}, {"data": [[1.70349432E12, 525.0], [1.7034942E12, 537.0], [1.70349426E12, 533.0]], "isOverall": false, "label": "saveEmp-257", "isController": false}, {"data": [[1.70349432E12, 271.0], [1.7034942E12, 253.0], [1.70349426E12, 263.0]], "isOverall": false, "label": "saveEmp-256", "isController": false}, {"data": [[1.70349432E12, 330.0], [1.7034942E12, 1338.0], [1.70349426E12, 261.0]], "isOverall": false, "label": "saveEmp-255", "isController": false}, {"data": [[1.7034942E12, 544.0]], "isOverall": false, "label": "saveLogin-220-0", "isController": false}, {"data": [[1.7034942E12, 285.0]], "isOverall": false, "label": "saveLogin-220-1", "isController": false}, {"data": [[1.70349432E12, 265.0], [1.7034942E12, 266.0], [1.70349426E12, 270.0]], "isOverall": false, "label": "navigateToPim-238", "isController": false}, {"data": [[1.70349432E12, 228.0], [1.7034942E12, 210.0], [1.70349426E12, 206.0]], "isOverall": false, "label": "navigateToPim-239", "isController": false}, {"data": [[1.70349432E12, 228.0], [1.7034942E12, 243.0], [1.70349426E12, 220.0]], "isOverall": false, "label": "navigateToPim-237", "isController": false}, {"data": [[1.70349432E12, 401.0], [1.7034942E12, 407.0], [1.70349426E12, 397.0]], "isOverall": false, "label": "navigateToPim-241", "isController": false}, {"data": [[1.70349432E12, 219.0], [1.7034942E12, 221.0], [1.70349426E12, 235.0]], "isOverall": false, "label": "navigateToPim-242", "isController": false}, {"data": [[1.70349432E12, 209.0], [1.7034942E12, 212.0], [1.70349426E12, 211.0]], "isOverall": false, "label": "navigateToPim-240", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob", "isController": true}, {"data": [[1.70349432E12, 230.0], [1.7034942E12, 233.0], [1.70349426E12, 246.0]], "isOverall": false, "label": "navigateToPim-243", "isController": false}, {"data": [[1.70349432E12, 231.0], [1.7034942E12, 230.0], [1.70349426E12, 230.0]], "isOverall": false, "label": "navigateToPim-244", "isController": false}, {"data": [[1.70349432E12, 281.0], [1.7034942E12, 227.0], [1.70349426E12, 235.0]], "isOverall": false, "label": "navigateToAddEmp-254", "isController": false}, {"data": [[1.70349438E12, 436.0]], "isOverall": false, "label": "logOut-285-0", "isController": false}, {"data": [[1.70349432E12, 239.0], [1.7034942E12, 229.0], [1.70349426E12, 241.0]], "isOverall": false, "label": "navigateToAddEmp-250", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp", "isController": true}, {"data": [[1.70349438E12, 242.0]], "isOverall": false, "label": "logOut-285-1", "isController": false}, {"data": [[1.7034942E12, 216.0]], "isOverall": false, "label": "saveLogin-231", "isController": false}, {"data": [[1.7034942E12, 233.0]], "isOverall": false, "label": "saveLogin-230", "isController": false}, {"data": [[1.7034942E12, 256.0]], "isOverall": false, "label": "saveLogin-226", "isController": false}, {"data": [[1.70349432E12, 204.5], [1.70349426E12, 216.0]], "isOverall": false, "label": "screenJob-273", "isController": false}, {"data": [[1.7034942E12, 250.0]], "isOverall": false, "label": "saveLogin-225", "isController": false}, {"data": [[1.70349432E12, 203.0], [1.70349426E12, 210.0]], "isOverall": false, "label": "screenJob-274", "isController": false}, {"data": [[1.7034942E12, 238.0]], "isOverall": false, "label": "saveLogin-228", "isController": false}, {"data": [[1.70349432E12, 319.5], [1.70349426E12, 491.0]], "isOverall": false, "label": "screenJob-271", "isController": false}, {"data": [[1.7034942E12, 286.0]], "isOverall": false, "label": "saveLogin-227", "isController": false}, {"data": [[1.70349432E12, 205.0], [1.70349426E12, 221.0]], "isOverall": false, "label": "screenJob-272", "isController": false}, {"data": [[1.7034942E12, 274.0]], "isOverall": false, "label": "saveLogin-222", "isController": false}, {"data": [[1.70349432E12, 266.5], [1.70349426E12, 237.0]], "isOverall": false, "label": "screenJob-277", "isController": false}, {"data": [[1.7034942E12, 290.0]], "isOverall": false, "label": "saveLogin-221", "isController": false}, {"data": [[1.70349432E12, 267.5], [1.70349426E12, 238.0]], "isOverall": false, "label": "screenJob-278", "isController": false}, {"data": [[1.7034942E12, 249.0]], "isOverall": false, "label": "saveLogin-224", "isController": false}, {"data": [[1.70349432E12, 273.5], [1.70349426E12, 245.0]], "isOverall": false, "label": "screenJob-275", "isController": false}, {"data": [[1.70349432E12, 228.5], [1.70349426E12, 231.0]], "isOverall": false, "label": "screenJob-276", "isController": false}, {"data": [[1.7034942E12, 296.0]], "isOverall": false, "label": "GetLandingPage-219", "isController": false}, {"data": [[1.70349432E12, 224.0], [1.70349426E12, 241.0]], "isOverall": false, "label": "screenJob-279", "isController": false}, {"data": [[1.7034942E12, 1858.0]], "isOverall": false, "label": "GetLandingPage-218", "isController": false}, {"data": [[1.7034942E12, 254.0]], "isOverall": false, "label": "saveLogin-229", "isController": false}, {"data": [[1.70349432E12, 277.0], [1.70349426E12, 478.0]], "isOverall": false, "label": "saveEmp-270", "isController": false}, {"data": [[1.7034942E12, 544.0]], "isOverall": false, "label": "saveLogin-220", "isController": false}, {"data": [[1.70349432E12, 228.0], [1.7034942E12, 243.0], [1.70349426E12, 220.0]], "isOverall": false, "label": "navigateToPim-237-0", "isController": false}, {"data": [[1.70349432E12, 261.0], [1.7034942E12, 331.0], [1.70349426E12, 281.0]], "isOverall": false, "label": "navigateToPim-237-1", "isController": false}, {"data": [[1.70349438E12, 0.0]], "isOverall": false, "label": "logOut", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70349438E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7034942E12, "maxY": 1556.0, "series": [{"data": [[1.70349432E12, 0.0], [1.70349438E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveJob-284", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349438E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveJob-283", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin", "isController": true}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-269", "isController": false}, {"data": [[1.70349432E12, 98.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-268", "isController": false}, {"data": [[1.7034942E12, 1556.0]], "isOverall": false, "label": "GetLandingPage", "isController": true}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-267", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-266", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-265", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-264", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 207.0]], "isOverall": false, "label": "saveEmp-263", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-262", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-261", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-260", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-280", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-281", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349438E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveJob", "isController": true}, {"data": [[1.70349438E12, 252.0]], "isOverall": false, "label": "logOut-285", "isController": false}, {"data": [[1.70349438E12, 0.0]], "isOverall": false, "label": "logOut-286", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp-249", "isController": false}, {"data": [[1.70349438E12, 0.0]], "isOverall": false, "label": "logOut-287", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp-248", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp-246", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp-245", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim", "isController": true}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 207.0], [1.70349426E12, 196.0]], "isOverall": false, "label": "saveEmp", "isController": true}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-259", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-258", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-257", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-256", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-255", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-220-0", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-220-1", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-238", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-239", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-237", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-241", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-242", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-240", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob", "isController": true}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-243", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-244", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp-254", "isController": false}, {"data": [[1.70349438E12, 252.0]], "isOverall": false, "label": "logOut-285-0", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp-250", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToAddEmp", "isController": true}, {"data": [[1.70349438E12, 0.0]], "isOverall": false, "label": "logOut-285-1", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-231", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-230", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-226", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-273", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-225", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-274", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-228", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-271", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-227", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-272", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-222", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-277", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-221", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-278", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-224", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-275", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-276", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "GetLandingPage-219", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "screenJob-279", "isController": false}, {"data": [[1.7034942E12, 1556.0]], "isOverall": false, "label": "GetLandingPage-218", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-229", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "saveEmp-270", "isController": false}, {"data": [[1.7034942E12, 0.0]], "isOverall": false, "label": "saveLogin-220", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-237-0", "isController": false}, {"data": [[1.70349432E12, 0.0], [1.7034942E12, 0.0], [1.70349426E12, 0.0]], "isOverall": false, "label": "navigateToPim-237-1", "isController": false}, {"data": [[1.70349438E12, 252.0]], "isOverall": false, "label": "logOut", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70349438E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 202.0, "minX": 1.7034942E12, "maxY": 3571.0, "series": [{"data": [[1.70349432E12, 3571.0], [1.70349438E12, 678.0], [1.7034942E12, 1879.0], [1.70349426E12, 2496.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70349432E12, 202.0], [1.70349438E12, 233.0], [1.7034942E12, 213.0], [1.70349426E12, 207.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70349432E12, 493.1], [1.70349438E12, 678.0], [1.7034942E12, 663.900000000001], [1.70349426E12, 541.1]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70349432E12, 3571.0], [1.70349438E12, 678.0], [1.7034942E12, 1879.0], [1.70349426E12, 2496.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70349432E12, 255.5], [1.70349438E12, 244.0], [1.7034942E12, 286.5], [1.70349426E12, 261.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.70349432E12, 594.6999999999996], [1.70349438E12, 678.0], [1.7034942E12, 1419.9999999999993], [1.70349426E12, 837.649999999999]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70349438E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 233.5, "minX": 1.0, "maxY": 348.0, "series": [{"data": [[2.0, 348.0], [1.0, 271.0], [4.0, 242.0], [5.0, 233.5], [3.0, 342.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 5.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 228.0, "minX": 1.0, "maxY": 282.5, "series": [{"data": [[2.0, 280.5], [1.0, 271.0], [4.0, 238.5], [5.0, 228.0], [3.0, 282.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 5.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.1, "minX": 1.7034942E12, "maxY": 1.0333333333333334, "series": [{"data": [[1.70349432E12, 1.0333333333333334], [1.70349438E12, 0.1], [1.7034942E12, 0.6], [1.70349426E12, 0.85]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70349438E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7034942E12, "maxY": 1.0166666666666666, "series": [{"data": [[1.70349432E12, 1.0166666666666666], [1.70349438E12, 0.1], [1.7034942E12, 0.5666666666666667], [1.70349426E12, 0.8166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349438E12, 0.016666666666666666], [1.7034942E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70349438E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7034942E12, "maxY": 0.03333333333333333, "series": [{"data": [[1.70349432E12, 0.016666666666666666], [1.70349426E12, 0.03333333333333333]], "isOverall": false, "label": "saveEmp-265-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-success", "isController": true}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-226-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-280-success", "isController": false}, {"data": [[1.70349438E12, 0.016666666666666666]], "isOverall": false, "label": "logOut-286-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-267-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-245-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-249-success", "isController": false}, {"data": [[1.70349438E12, 0.016666666666666666]], "isOverall": false, "label": "logOut-285-0-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-224-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-269-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-228-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349438E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveJob-284-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "GetLandingPage-219-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-230-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-271-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-success", "isController": true}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-success", "isController": true}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-274-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-239-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-258-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-220-1-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-270-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-231-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-237-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-256-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349438E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveJob-success", "isController": true}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349426E12, 0.03333333333333333]], "isOverall": false, "label": "saveEmp-261-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-242-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-278-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-276-success", "isController": false}, {"data": [[1.70349438E12, 0.016666666666666666]], "isOverall": false, "label": "logOut-285-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-244-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-263-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-221-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-225-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-248-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-281-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349426E12, 0.03333333333333333]], "isOverall": false, "label": "saveEmp-264-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-237-1-success", "isController": false}, {"data": [[1.70349438E12, 0.016666666666666666]], "isOverall": false, "label": "logOut-287-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-266-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-250-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-229-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-240-success", "isController": false}, {"data": [[1.70349438E12, 0.016666666666666666]], "isOverall": false, "label": "logOut-285-1-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "GetLandingPage-218-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-227-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-272-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-246-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-success", "isController": true}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-255-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-268-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349438E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveJob-283-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-259-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToAddEmp-254-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-275-success", "isController": false}, {"data": [[1.70349438E12, 0.016666666666666666]], "isOverall": false, "label": "logOut-success", "isController": true}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-273-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-238-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-257-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-220-0-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-241-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-220-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349426E12, 0.03333333333333333]], "isOverall": false, "label": "saveEmp-260-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-279-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-237-0-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "saveEmp-success", "isController": true}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "saveLogin-222-success", "isController": false}, {"data": [[1.70349432E12, 0.03333333333333333], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "screenJob-277-success", "isController": false}, {"data": [[1.70349432E12, 0.016666666666666666], [1.7034942E12, 0.016666666666666666], [1.70349426E12, 0.016666666666666666]], "isOverall": false, "label": "navigateToPim-243-success", "isController": false}, {"data": [[1.7034942E12, 0.016666666666666666]], "isOverall": false, "label": "GetLandingPage-success", "isController": true}, {"data": [[1.70349432E12, 0.016666666666666666], [1.70349426E12, 0.03333333333333333]], "isOverall": false, "label": "saveEmp-262-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70349438E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.15, "minX": 1.7034942E12, "maxY": 1.1333333333333333, "series": [{"data": [[1.70349432E12, 1.1333333333333333], [1.70349438E12, 0.15], [1.7034942E12, 0.6833333333333333], [1.70349426E12, 0.9166666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70349438E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
