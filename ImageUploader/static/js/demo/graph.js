function piechart (root, data, height){
    Highcharts.chart(root, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: height
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            },
            // series:{
            //     dataLabels: {
            //         enabled: true,
            //         format: '{point.name}: {point.y:.1f}%'
            //     }
            // }
        },
        // legend: {
        //     align: 'right',
        //     layout: 'vertical',
        //     verticalAlign: 'top',
        //     x: -10,
        //     y: 30
        // },
        series: [{
            name: 'percentage',
            colorByPoint: true,
            data: data
        }]
    });
}
// 옵션 수정하기