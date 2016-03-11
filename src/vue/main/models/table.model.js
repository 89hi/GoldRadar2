import DateUtil from  '../../common/services/date.service.js'
import storage from   '../../common/services/storage.service.js'

class Table {
	constructor($el,param,loader){
		this.$el = $el;
		this.param = {}
		param && (this.param = param)
		this.dataLoader = loader
		this.minarr = []
		this.maxarr = []
		this.itemarr = []
	}
	loadData(callback){
    var _this = this,itemarr = [],maxarr = [] ,minarr = [],finalarr=[];
    _this.clearData();
    var param =  _this.param;
    this.dataLoader.getTableData(this.param)
    .then((res) => {
    	  var data = res.data;
        data.sort(function(a,b){
            return parseInt(b.price)-parseInt(a.price);
        });

        if(data.length == 0){
        	return;
        }
        for (var i = data.length - 1; i >= 0; i--) {
            itemarr[i] = [];
        };

        for (var i = data.length  - 1; i >= 0; i--) {
            itemarr[i].push(data[i].buy);
            itemarr[i].push(data[i].price);
            itemarr[i].push(data[i].sell);

            if(maxarr.length == 0 || minarr.length == 0){
                maxarr = [0,0,0];
                minarr = [0,0,0];
            }

            if(data[i].buy > maxarr[0]){
                maxarr[0] = data[i].buy;
            }

            if(data[i].sell > maxarr[2]){
                maxarr[2] = data[i].sell;
            }

            if(data[i].buy < minarr[0]){
                minarr[0] = data[i].buy;
            }

            if(data[i].sell < minarr[2]){
                minarr[2] = data[i].sell;
            }
        };

        for (var i = itemarr.length  - 1; i >= 0; i--) {
        	finalarr[i] = [];
        	for (var j = 0; j < itemarr[i].length; j++) {
        		finalarr[i].push({
        			style:{
        				width:(itemarr[i][j]*100/maxarr[j])+'%'
        			},
        			value:itemarr[i][j]
        		});
        	};
        }

        finalarr.sort(function(a,b){
            return a[1].value-b[1].value
        })
        this.minarr = minarr;
        this.maxarr = maxarr;
        this.itemarr = finalarr;
        callback&&callback(); 
      })
	}
	clearData(){
		this.minarr = [];
		this.maxarr = [];
		this.itemarr = [];
	}
}

export default Table