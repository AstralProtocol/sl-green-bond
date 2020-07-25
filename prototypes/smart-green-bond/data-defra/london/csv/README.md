## DEFRA NOx levels across London - CSVs

CSVs - each row is a point within the bounds of London. The `x` and `y` attributes are BNG Easting and Northing values, while the `nox20**` property is a float value representing annual mean µg m^-3 (NOX as NO2). 

Each file and contains 4 columns:
- a unique code (ukgridcode) for each 1x1km cell in the map
- the x coordinates for the centroid of each grid cell
- the y coordinates for the centroid of each grid cell
- the values for the metric itself.

The ukgridcode field allows several maps to be joined in a single file using that code as the lookup column.

Note that some values are MISSING and many files the nox properties are strings and need to be typecast. 

Data from [DEFRA](https://uk-air.defra.gov.uk/data/pcm-data#nox) website, example endpoint `https://uk-air.defra.gov.uk/datastore/pcm/mapnox2013.csv`.

Points within the boundaries of London represented in [this GeoJSON](../london-boundary.geojson) were selected and exported using QGIS. To automate this, consider gdal, [`turf.pointsWithinPolygon`](https://turfjs.org/docs/#pointsWithinPolygon) or something similar.