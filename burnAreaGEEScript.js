var bc = ee.FeatureCollection('FAO/GAUL/2015/level1');

// Filter the boundaries to get the British Columbia province
var bcBoundary = bc.filter(ee.Filter.eq('ADM1_CODE', 826));

var image = ee.Image("projects/uraproject-426320/assets/BurnAreaExactFinal").clip(bcBoundary);
console.log(image)

var centroid = image.geometry().centroid();
console.log(centroid)
var vizParams = {
  bands: ['b1'],
  min: 0,
  max: 1,
};

// Center the map and display the image.
Map.setCenter(-114.78, 56.98, 6); 
Map.addLayer(image, vizParams, 'Burn Area');
