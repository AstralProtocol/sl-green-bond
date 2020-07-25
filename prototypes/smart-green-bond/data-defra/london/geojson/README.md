## DEFRA NOx levels across London

GeoJSON FeatureCollections in WGS84 projection - each point in the Features array is in London. The `x` and `y` attributes are BNG Easting and Northing values, while the `nox20**` property is a float value representing annual mean µg m^-3 (NOX as NO2). 

Note that some values are MISSING and many files the nox properties are strings and need to be typecast.

Data from [DEFRA](https://uk-air.defra.gov.uk/data/pcm-data#nox) website, example endpoint `https://uk-air.defra.gov.uk/datastore/pcm/mapnox2013.csv`.