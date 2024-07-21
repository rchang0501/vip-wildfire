// load era5Daily data
var era5Daily = mask(ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR").filter(ee.Filter.date('2020-01-01', '2024-05-01')));

// Function to extract a single band from the image collection and create a new image collection
function extract_band(band_name) {
  return era5Daily.select(band_name);
}

// Function to convert an image collection to a single image with each image as a band
function collection_to_single_image(image_collection) {
  return image_collection.toBands();
}

// Get the list of band names from the first image in the collection
var band_names = era5Daily.first().bandNames().getInfo();
print(band_names) // here you can view the different bands

// Array to hold the images for visualization
var imageLayers = [];

// Extract each band as a separate image and store in the array
band_names.forEach(function(band_name) {
  var band_collection = extract_band(band_name);
  var single_image = collection_to_single_image(band_collection);

  // Adding the image to the array of image layers
  imageLayers.push(single_image);
});

var index = 1 // specify the index corresponding to parameter you want to visualize

var vizParams = {
  min: 0,
  max: 1,
  bands: ['20200101_' + band_names[index]]
}

Map.addLayer(imageLayers[index], vizParams);