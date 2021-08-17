const mongoose = require('mongoose');  
const mongoosePaginate = require('mongoose-paginate');
const StreamPlayistScheme = new mongoose.Schema({

    name:String,
    streamurl:String,
    outputservers:[new mongoose.Schema({

        url:String

    },{_id:false})],
    isactive:Boolean

}); 
StreamPlayistScheme.plugin(mongoosePaginate);
mongoose.model('StreamPlayist', StreamPlayistScheme);
module.exports = mongoose.model('StreamPlayist');
