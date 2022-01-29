const { Schema, model } = require('mongoose');

const CompanySchema = new Schema({
      rnc: {
          type: String,
          required: [true, "The rnc is required"],
          unique: true
      },
      name:{
          type: String,
          required: [true, "The name is required" ],
      },
      commercialName:{
          type: String,
          required: [true, "The commercialName is required"]
      },
      paymentScheme:{
          type: String,
          required: [true, "The paymentScheme is required"]
      },
      status: {
          type: String,
          required: [true, "The state is required"]
      },
      economicActivity: {
          type: String,
          required: [true, "The economicActivity is required"]
      },
      governmentBranch: {
          type: String, 
          required: [ true, "The governmentBranch is required"]
      },
      category: {
          type: String
      }
});

CompanySchema.methods.toJSON = function(){
    const { __v, _id, ...company } = this.toObject();
    company.id = _id;
    return company;
}



module.exports = model( 'Company', CompanySchema );