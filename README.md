# tsdb_charts_app
Web app showing chart graphs for TSDB metrics

Host should be running tsdb daemon taking numeric measurements for multiple metrics. 
Metrics list, start and end timestamps (meta data) are stored in local mongo DB.

App runs python script to get data from TSDB (a binary file, managed by daemon), shows the chart for specific metric.

More details in my tsdb repo.

Demo at http://18.196.50.126/
