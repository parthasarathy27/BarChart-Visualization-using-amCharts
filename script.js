am4core.ready(function() {

    am4core.useTheme(am4themes_animated);
  
    var chart = am4core.create("chartdiv", am4charts.XYChart);
  
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load JSON data.");
        }
        return response.json();
      })
      .then(data => {
        chart.data = data.monthly_usage;
  
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "month";
        categoryAxis.title.text = "Months";
        
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Fuel Usage (Liters)";
  
        var petrolSeries = chart.series.push(new am4charts.ColumnSeries());
        petrolSeries.name = "Petrol";
        petrolSeries.dataFields.valueY = "petrol_used_liters";
        petrolSeries.dataFields.categoryX = "month";
        petrolSeries.columns.template.fill = am4core.color("#ff5722");
        petrolSeries.columns.template.tooltipText = "Petrol Usage: {valueY} liters";
  
        var dieselSeries = chart.series.push(new am4charts.ColumnSeries());
        dieselSeries.name = "Diesel";
        dieselSeries.dataFields.valueY = "diesel_used_liters";
        dieselSeries.dataFields.categoryX = "month";
        dieselSeries.columns.template.fill = am4core.color("#2196f3");
        dieselSeries.columns.template.tooltipText = "Diesel Usage: {valueY} liters";
  
        chart.legend = new am4charts.Legend();
  
        chart.responsive.enabled = true;
      })
      .catch(error => {
        console.error("Error loading data:", error);
      });
  
  });
  