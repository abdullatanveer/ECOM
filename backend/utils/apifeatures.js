class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
        this.keyword={};
    }


    /// Serachingg
    search(){
        const keyword=this.querystr.keyword ?
        {
            name:{
                $regex:this.querystr.keyword,
                $options:"i",
            },

        }:{};
        //console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    // filtering

    filter(){
        const querCopy={...this.querystr};
        //console.log(querCopy);
        
        // removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=> delete querCopy[key]);
       //console.log(querCopy);

       // filter for price
       console.log(querCopy);
       
       let querystr=JSON.stringify(querCopy);
       querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
       // console.log(querystr);
     this.query = this.query.find(JSON.parse(querystr));


      //this.query=this.query.find(querCopy);
       //console.log(querCopy); 

       return this;

    }


   // Pagination  
   pagination(resultPerPage){
     const currentPage= Number(this.querystr.page)|| 1; // 50-10
     const skip =resultPerPage * (currentPage-1); // (2-1)  it will skip first 10 products

     this.query=this.query.limit(resultPerPage).skip(skip);
     return this;
   }



}
module.exports=ApiFeatures;