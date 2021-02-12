module.exports.lookup = (array, cb) => {
  console.log('IN THE SORTER')

  let tempArray = array

  for (var j = 0; j < tempArray.length; j++) {
    for (var i = 0; i < tempArray.length - 1; i++) {
      if (tempArray[i]._doc.watchers_count < tempArray[i + 1]._doc.watchers_count) {
        let tempValue = tempArray[i + 1]
        tempArray[i + 1] = tempArray[i]
        tempArray[i] = tempValue
      }
    }
  }

  cb(array.slice(0,25))
}