
module.exports = {
    // Helper function to format date 
    format_date: date => {
      console.log(date);
      var newdate = new Date(date)
      return `${newdate.getMonth() + 1}/${newdate.getDate()}/${newdate.getFullYear()}`;
    },

    logShit(comment){
      console.log("comment", comment);
    }
    //add additional custom helpers here if needed
  };
